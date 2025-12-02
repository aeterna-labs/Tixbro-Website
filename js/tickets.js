// Ticket Purchase and Management for Tixbro
import { db } from './firebase-config.js';
import {
    collection,
    doc,
    setDoc,
    getDoc,
    getDocs,
    query,
    where,
    updateDoc,
    increment,
    runTransaction
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Purchase single ticket
export async function purchaseTicket(eventId, customerData, paymentData) {
    try {
        const ticketId = 'TKT-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);

        // Run transaction to ensure atomic operations
        await runTransaction(db, async (transaction) => {
            // Get event data
            const eventRef = doc(db, "events", eventId);
            const eventDoc = await transaction.get(eventRef);

            if (!eventDoc.exists()) {
                throw new Error("Event not found");
            }

            const eventData = eventDoc.data();

            // Check if tickets are available
            if (eventData.availableTickets <= 0) {
                throw new Error("No tickets available");
            }

            // Calculate amounts (Tixbro takes 10% commission)
            const ticketPrice = eventData.price;
            const tixbroCommission = ticketPrice * 0.10;
            const companyPayout = ticketPrice * 0.90;

            // Create ticket document
            const ticketRef = doc(db, "tickets", ticketId);
            transaction.set(ticketRef, {
                ticketId: ticketId,
                eventId: eventId,
                eventTitle: eventData.title,
                companyId: eventData.companyId,
                customerName: customerData.name,
                customerEmail: customerData.email,
                customerPhone: customerData.phone || '',
                ticketPrice: ticketPrice,
                tixbroCommission: tixbroCommission,
                companyPayout: companyPayout,
                paymentStatus: 'completed',
                paymentMethod: 'credit_card',
                paymentId: paymentData.paymentId,
                eventDate: eventData.date,
                eventTime: eventData.time,
                eventLocation: eventData.location,
                eventVenue: eventData.venue,
                purchaseDate: new Date().toISOString(),
                status: 'valid', // valid, used, cancelled
                qrCode: ticketId // Simple QR code - could be enhanced
            });

            // Update event tickets
            transaction.update(eventRef, {
                availableTickets: increment(-1),
                soldTickets: increment(1)
            });

            // Update event status if sold out
            if (eventData.availableTickets - 1 <= 0) {
                transaction.update(eventRef, {
                    status: 'sold_out'
                });
            }

            // Update company revenue
            const companyRef = doc(db, "companies", eventData.companyId);
            transaction.update(companyRef, {
                totalRevenue: increment(companyPayout),
                totalTicketsSold: increment(1)
            });
        });

        return { success: true, ticketId: ticketId };
    } catch (error) {
        console.error("Purchase ticket error:", error);
        return { success: false, error: error.message };
    }
}

// Get ticket by ID
export async function getTicket(ticketId) {
    try {
        const ticketDoc = await getDoc(doc(db, "tickets", ticketId));

        if (!ticketDoc.exists()) {
            throw new Error("Ticket not found");
        }

        return { success: true, ticket: ticketDoc.data() };
    } catch (error) {
        console.error("Get ticket error:", error);
        return { success: false, error: error.message };
    }
}

// Get tickets by email
export async function getTicketsByEmail(email) {
    try {
        const q = query(
            collection(db, "tickets"),
            where("customerEmail", "==", email),
            where("status", "==", "valid")
        );

        const querySnapshot = await getDocs(q);
        const tickets = [];
        querySnapshot.forEach((doc) => {
            tickets.push(doc.data());
        });

        return { success: true, tickets: tickets };
    } catch (error) {
        console.error("Get tickets by email error:", error);
        return { success: false, error: error.message };
    }
}

// Process payment with Stripe (simplified - needs Stripe integration)
export async function processPayment(amount, cardDetails) {
    // This is a placeholder for Stripe integration
    // In production, you would use Stripe.js and create a payment intent

    try {
        // Simulate payment processing
        // In real implementation, call Stripe API here

        return {
            success: true,
            paymentId: 'pay_' + Date.now() + Math.random().toString(36).substr(2, 9)
        };
    } catch (error) {
        console.error("Payment error:", error);
        return { success: false, error: error.message };
    }
}

// Send ticket email (placeholder - needs email service integration)
export async function sendTicketEmail(ticketData) {
    try {
        // This would integrate with an email service like SendGrid or Firebase Cloud Functions
        // For now, return success

        console.log("Sending ticket email to:", ticketData.customerEmail);
        console.log("Ticket ID:", ticketData.ticketId);

        return { success: true };
    } catch (error) {
        console.error("Send email error:", error);
        return { success: false, error: error.message };
    }
}
