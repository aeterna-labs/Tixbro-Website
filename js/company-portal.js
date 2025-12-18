// Company Portal - Bookings & Turf Management
// Firebase Integration for Event Organizers

import { db } from './firebase-config.js';
import {
    collection,
    query,
    where,
    getDocs,
    orderBy,
    limit,
    onSnapshot,
    updateDoc,
    doc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// ====== BOOKINGS MANAGEMENT ======

// Load bookings for company
export async function loadCompanyBookings(companyId, filterStatus = 'all') {
    try {
        // First, get all company events
        const eventsQuery = query(
            collection(db, "events"),
            where("companyId", "==", companyId)
        );

        const eventsSnapshot = await getDocs(eventsQuery);
        const eventIds = [];
        eventsSnapshot.forEach((doc) => {
            eventIds.push(doc.data().eventId);
        });

        if (eventIds.length === 0) {
            return { success: true, bookings: [] };
        }

        // Then get all orders for these events
        const ordersQuery = query(
            collection(db, "orders"),
            where("eventId", "in", eventIds.slice(0, 10)), // Firestore limit: max 10 items in 'in' query
            orderBy("createdAt", "desc"),
            limit(100)
        );

        const ordersSnapshot = await getDocs(ordersQuery);
        const bookings = [];

        ordersSnapshot.forEach((doc) => {
            const booking = { id: doc.id, ...doc.data() };

            // Apply filter
            if (filterStatus === 'all' || booking.status === filterStatus) {
                bookings.push(booking);
            }
        });

        return { success: true, bookings };
    } catch (error) {
        console.error('Error loading bookings:', error);
        return { success: false, error: error.message };
    }
}

// Update booking status
export async function updateBookingStatus(orderId, newStatus, ticketIds = []) {
    try {
        const updateData = {
            status: newStatus,
            updatedAt: new Date().toISOString()
        };

        if (newStatus === 'tickets_sent' || newStatus === 'completed') {
            updateData.ticketsSent = true;
            if (ticketIds.length > 0) {
                updateData.ticketIds = ticketIds;
            }
        }

        if (newStatus === 'completed') {
            updateData.ticketsCreated = true;
        }

        await updateDoc(doc(db, "orders", orderId), updateData);
        return { success: true };
    } catch (error) {
        console.error('Error updating booking status:', error);
        return { success: false, error: error.message };
    }
}

// Display bookings in table
export function displayBookings(bookings) {
    const tbody = document.getElementById('bookingsTableBody');

    if (!bookings || bookings.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="8" class="text-center">
                    <div class="loading-spinner">
                        <i class="fas fa-inbox"></i>
                        <p>No bookings found</p>
                    </div>
                </td>
            </tr>
        `;
        return;
    }

    tbody.innerHTML = bookings.map(booking => `
        <tr>
            <td><strong>${booking.orderId || 'N/A'}</strong></td>
            <td>
                <div>${booking.customerFirstName} ${booking.customerLastName}</div>
                <small style="color: var(--text-secondary)">${booking.customerEmail}</small>
            </td>
            <td>${booking.eventTitle || 'Unknown Event'}</td>
            <td>${booking.quantity || 1}</td>
            <td><strong>₹${booking.totalAmount || 0}</strong></td>
            <td>${formatDate(booking.createdAt)}</td>
            <td>${getStatusBadge(booking.status)}</td>
            <td>
                <button class="booking-action-btn" onclick="viewBookingDetails('${booking.id}')">
                    <i class="fas fa-eye"></i> View
                </button>
            </td>
        </tr>
    `).join('');

    // Update stats
    updateBookingStats(bookings);
}

// Get status badge HTML
function getStatusBadge(status) {
    const statusConfig = {
        'paid': { class: 'status-paid', icon: 'fa-clock', text: 'Paid' },
        'tickets_sent': { class: 'status-completed', icon: 'fa-check', text: 'Tickets Sent' },
        'completed': { class: 'status-completed', icon: 'fa-check-double', text: 'Completed' },
        'pending': { class: 'status-pending', icon: 'fa-exclamation', text: 'Pending' }
    };

    const config = statusConfig[status] || statusConfig['pending'];

    return `
        <span class="booking-status ${config.class}">
            <i class="fas ${config.icon}"></i>
            ${config.text}
        </span>
    `;
}

// Update booking statistics
function updateBookingStats(bookings) {
    const pending = bookings.filter(b => b.status === 'paid' && !b.ticketsSent).length;
    const completed = bookings.filter(b => b.status === 'completed').length;

    const today = new Date().toDateString();
    const todayBookings = bookings.filter(b => {
        const bookingDate = b.createdAt?.toDate ? b.createdAt.toDate().toDateString() : new Date(b.createdAt).toDateString();
        return bookingDate === today;
    }).length;

    const totalRevenue = bookings.reduce((sum, b) => sum + (b.totalAmount || 0), 0);

    document.getElementById('pendingBookings').textContent = pending;
    document.getElementById('completedBookings').textContent = completed;
    document.getElementById('todayBookings').textContent = todayBookings;
    document.getElementById('bookingsRevenue').textContent = `₹${totalRevenue.toLocaleString('en-IN')}`;
}

// ====== TURF SLOT MANAGEMENT ======

// Load turf events for company
export async function loadTurfEvents(companyId) {
    try {
        const turfQuery = query(
            collection(db, "events"),
            where("companyId", "==", companyId),
            where("category", "==", "turf")
        );

        const snapshot = await getDocs(turfQuery);
        const turfs = [];

        snapshot.forEach((doc) => {
            turfs.push({ id: doc.id, ...doc.data() });
        });

        return { success: true, turfs };
    } catch (error) {
        console.error('Error loading turf events:', error);
        return { success: false, error: error.message };
    }
}

// Generate time slots for a date
export function generateTimeSlots(date, turfPrice = 500) {
    const slots = [];

    // Morning slots: 6 AM - 12 PM
    for (let hour = 6; hour < 12; hour++) {
        slots.push({
            id: `slot-${date}-${hour}`,
            time: `${formatHour(hour)}:00 - ${formatHour(hour + 1)}:00`,
            period: 'morning',
            startHour: hour,
            endHour: hour + 1,
            price: turfPrice,
            status: 'available', // available, booked, blocked
            customerName: null,
            bookingId: null
        });
    }

    // Afternoon slots: 12 PM - 5 PM
    for (let hour = 12; hour < 17; hour++) {
        slots.push({
            id: `slot-${date}-${hour}`,
            time: `${formatHour(hour)}:00 - ${formatHour(hour + 1)}:00`,
            period: 'afternoon',
            startHour: hour,
            endHour: hour + 1,
            price: turfPrice + 100, // Afternoon slightly more expensive
            status: 'available',
            customerName: null,
            bookingId: null
        });
    }

    // Evening slots: 5 PM - 11 PM (Prime time - most expensive)
    for (let hour = 17; hour < 23; hour++) {
        slots.push({
            id: `slot-${date}-${hour}`,
            time: `${formatHour(hour)}:00 - ${formatHour(hour + 1)}:00`,
            period: 'evening',
            startHour: hour,
            endHour: hour + 1,
            price: turfPrice + 200, // Evening most expensive
            status: 'available',
            customerName: null,
            bookingId: null
        });
    }

    return slots;
}

// Format hour to 12-hour format
function formatHour(hour) {
    if (hour === 0) return '12 AM';
    if (hour < 12) return `${hour} AM`;
    if (hour === 12) return '12 PM';
    return `${hour - 12} PM`;
}

// Display turf slots
export function displayTurfSlots(slots, bookings = []) {
    // Group slots by period
    const morningSlots = slots.filter(s => s.period === 'morning');
    const afternoonSlots = slots.filter(s => s.period === 'afternoon');
    const eveningSlots = slots.filter(s => s.period === 'evening');

    // Mark booked slots
    bookings.forEach(booking => {
        const slotTime = booking.eventTime; // Assuming time is stored like "14:00-15:00"
        const slot = slots.find(s => s.time.includes(slotTime) || slotTime.includes(s.time));
        if (slot) {
            slot.status = 'booked';
            slot.customerName = `${booking.customerFirstName} ${booking.customerLastName}`;
            slot.bookingId = booking.id;
        }
    });

    // Render each period
    document.getElementById('morningSlots').innerHTML = renderSlotCards(morningSlots);
    document.getElementById('afternoonSlots').innerHTML = renderSlotCards(afternoonSlots);
    document.getElementById('eveningSlots').innerHTML = renderSlotCards(eveningSlots);

    // Update summary
    const bookedCount = slots.filter(s => s.status === 'booked').length;
    const availableCount = slots.filter(s => s.status === 'available').length;
    const revenue = slots.filter(s => s.status === 'booked').reduce((sum, s) => sum + s.price, 0);

    document.getElementById('totalSlots').textContent = slots.length;
    document.getElementById('bookedSlots').textContent = bookedCount;
    document.getElementById('availableSlots').textContent = availableCount;
    document.getElementById('slotRevenue').textContent = `₹${revenue.toLocaleString('en-IN')}`;

    // Show the slots grid
    document.getElementById('turfSlotsGrid').style.display = 'flex';
}

// Render slot cards HTML
function renderSlotCards(slots) {
    return slots.map(slot => `
        <div class="slot-card slot-${slot.status}" onclick="viewSlotDetails('${slot.id}')">
            <div class="slot-time">${slot.time}</div>
            <div class="slot-status">
                <span class="slot-status-icon ${slot.status}"></span>
                <span>${slot.status.toUpperCase()}</span>
            </div>
            ${slot.status === 'available'
                ? `<div class="slot-price">₹${slot.price}</div>`
                : `<div class="slot-customer">${slot.customerName || 'Reserved'}</div>`
            }
        </div>
    `).join('');
}

// ====== MODAL FUNCTIONS ======

// View booking details
window.viewBookingDetails = async function(bookingId) {
    const modal = document.getElementById('bookingDetailsModal');
    const modalBody = document.getElementById('bookingDetailsBody');

    modalBody.innerHTML = '<div class="loading-spinner"><i class="fas fa-spinner fa-spin"></i></div>';
    modal.classList.add('active');

    try {
        // Fetch booking details
        // For now, use demo data - in production, fetch from Firebase
        modalBody.innerHTML = `
            <div style="display: flex; flex-direction: column; gap: 1rem;">
                <div>
                    <strong>Order ID:</strong> ORD-123456789
                </div>
                <div>
                    <strong>Customer:</strong> John Doe
                </div>
                <div>
                    <strong>Email:</strong> john@example.com
                </div>
                <div>
                    <strong>Phone:</strong> +91 9876543210
                </div>
                <hr>
                <div>
                    <strong>Event:</strong> Rock Concert 2024
                </div>
                <div>
                    <strong>Quantity:</strong> 2 tickets
                </div>
                <div>
                    <strong>Total Amount:</strong> ₹1,000
                </div>
                <hr>
                <div>
                    <strong>Status:</strong> Paid
                </div>
                <div>
                    <strong>Payment ID:</strong> pi_abc123xyz
                </div>
                <div>
                    <strong>Date:</strong> 18 Dec 2024, 14:30
                </div>
                <hr>
                <div style="display: flex; gap: 0.5rem; margin-top: 1rem;">
                    <button class="btn btn-primary" onclick="markTicketsSent('${bookingId}')">
                        <i class="fas fa-check"></i> Mark Tickets Sent
                    </button>
                    <button class="btn btn-outline" onclick="closeBookingModal()">
                        Close
                    </button>
                </div>
            </div>
        `;
    } catch (error) {
        modalBody.innerHTML = `<p style="color: red;">Error loading booking details</p>`;
    }
};

// View slot details
window.viewSlotDetails = function(slotId) {
    const modal = document.getElementById('slotDetailsModal');
    const modalBody = document.getElementById('slotDetailsBody');

    modalBody.innerHTML = `
        <div style="display: flex; flex-direction: column; gap: 1rem;">
            <div>
                <strong>Slot ID:</strong> ${slotId}
            </div>
            <div>
                <strong>Time:</strong> 14:00 - 15:00
            </div>
            <div>
                <strong>Status:</strong> Available
            </div>
            <div>
                <strong>Price:</strong> ₹700
            </div>
            <hr>
            <div style="display: flex; gap: 0.5rem; margin-top: 1rem;">
                <button class="btn btn-primary" onclick="blockSlot('${slotId}')">
                    <i class="fas fa-ban"></i> Block Slot
                </button>
                <button class="btn btn-outline" onclick="closeSlotModal()">
                    Close
                </button>
            </div>
        </div>
    `;

    modal.classList.add('active');
};

// Close modals
window.closeBookingModal = function() {
    document.getElementById('bookingDetailsModal').classList.remove('active');
};

window.closeSlotModal = function() {
    document.getElementById('slotDetailsModal').classList.remove('active');
};

// Mark tickets as sent
window.markTicketsSent = async function(bookingId) {
    const result = await updateBookingStatus(bookingId, 'tickets_sent');
    if (result.success) {
        alert('Tickets marked as sent!');
        closeBookingModal();
        // Reload bookings
        window.location.reload();
    } else {
        alert('Error updating booking: ' + result.error);
    }
};

// Block slot
window.blockSlot = function(slotId) {
    alert(`Slot ${slotId} has been blocked.`);
    closeSlotModal();
};

// ====== UTILITY FUNCTIONS ======

// Format date
function formatDate(dateInput) {
    if (!dateInput) return 'N/A';

    let date;
    if (dateInput.toDate) {
        date = dateInput.toDate(); // Firestore Timestamp
    } else if (typeof dateInput === 'string') {
        date = new Date(dateInput);
    } else {
        date = dateInput;
    }

    const options = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };

    return date.toLocaleDateString('en-IN', options);
}

// Export format date for external use
export { formatDate };
