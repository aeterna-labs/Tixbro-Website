// Ticket Viewer - Loads ticket data from Firebase and generates QR code + PDF

import { db } from './firebase-config.js';
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// DOM Elements
const loadingState = document.getElementById('loadingState');
const errorState = document.getElementById('errorState');
const ticketContainer = document.getElementById('ticketContainer');
const downloadPdfBtn = document.getElementById('downloadPdfBtn');

// Ticket Data
let ticketData = null;

/**
 * Initialize ticket viewer
 */
async function init() {
    try {
        // Get ticket ID from URL
        const urlParams = new URLSearchParams(window.location.search);
        const ticketId = urlParams.get('id');

        if (!ticketId) {
            throw new Error('No ticket ID provided');
        }

        console.log('Loading ticket:', ticketId);

        // Load ticket from Firebase
        ticketData = await loadTicketFromFirebase(ticketId);

        if (!ticketData) {
            throw new Error('Ticket not found');
        }

        // Display ticket
        displayTicket(ticketData);

        // Generate QR code
        generateQRCode(ticketData);

        // Show ticket, hide loading
        loadingState.style.display = 'none';
        ticketContainer.style.display = 'block';

        // Setup PDF download
        downloadPdfBtn.addEventListener('click', () => downloadTicketPDF(ticketData));

    } catch (error) {
        console.error('Error loading ticket:', error);
        showError();
    }
}

/**
 * Load ticket data from Firebase
 */
async function loadTicketFromFirebase(ticketId) {
    try {
        const ticketRef = doc(db, 'tickets', ticketId);
        const ticketSnap = await getDoc(ticketRef);

        if (!ticketSnap.exists()) {
            console.error('Ticket does not exist');
            return null;
        }

        const data = ticketSnap.data();
        console.log('Ticket loaded:', data);

        return {
            ticketId: ticketSnap.id,
            ...data
        };
    } catch (error) {
        console.error('Firebase error:', error);
        return null;
    }
}

/**
 * Display ticket information
 */
function displayTicket(ticket) {
    // Event Information
    document.getElementById('eventTitle').textContent = ticket.eventTitle || 'Event';
    document.getElementById('eventDate').textContent = formatDate(ticket.eventDate) || 'Date TBD';
    document.getElementById('eventTime').textContent = ticket.eventTime || 'Time TBD';
    document.getElementById('eventLocation').textContent = ticket.eventLocation || 'Location TBD';
    document.getElementById('eventVenue').textContent = ticket.eventVenue || 'Venue TBD';

    // Customer Information
    document.getElementById('customerName').textContent = ticket.customerName || 'N/A';
    document.getElementById('customerEmail').textContent = ticket.customerEmail || 'N/A';
    document.getElementById('customerPhone').textContent = ticket.customerPhone || 'N/A';

    // Ticket Information
    document.getElementById('ticketId').textContent = ticket.ticketId;
    document.getElementById('ticketPrice').textContent = '₹' + (ticket.amount || 0).toLocaleString('en-IN');
    document.getElementById('purchaseDate').textContent = formatDate(ticket.purchaseDate?.toDate ? ticket.purchaseDate.toDate() : new Date());
    document.getElementById('paymentId').textContent = ticket.paymentId || 'N/A';

    // Ticket Status
    const statusElement = document.getElementById('ticketStatus');
    if (ticket.used) {
        statusElement.innerHTML = '<i class="fas fa-times-circle"></i> Already Used';
        statusElement.classList.add('used');
    } else if (ticket.status === 'cancelled') {
        statusElement.innerHTML = '<i class="fas fa-ban"></i> Cancelled';
        statusElement.classList.add('cancelled');
    } else {
        statusElement.innerHTML = '<i class="fas fa-check-circle"></i> Valid Ticket';
    }
}

/**
 * Format date for display
 */
function formatDate(date) {
    if (!date) return '';

    try {
        // Handle Firestore Timestamp
        if (date.toDate && typeof date.toDate === 'function') {
            date = date.toDate();
        }

        // Handle string dates
        if (typeof date === 'string') {
            date = new Date(date);
        }

        // Check if valid date
        if (isNaN(date.getTime())) {
            return date.toString();
        }

        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    } catch (error) {
        console.error('Date formatting error:', error);
        return date.toString();
    }
}

/**
 * Generate QR Code
 */
function generateQRCode(ticket) {
    const qrContainer = document.getElementById('qrcode');

    // Clear existing QR code
    qrContainer.innerHTML = '';

    // QR Code data format: ticketId|eventId|customerEmail|status
    const qrData = `${ticket.ticketId}|${ticket.eventId}|${ticket.customerEmail}|${ticket.status}`;

    // Generate QR code
    new QRCode(qrContainer, {
        text: qrData,
        width: 256,
        height: 256,
        colorDark: '#000000',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.H
    });

    console.log('QR Code generated:', qrData);
}

/**
 * Download ticket as PDF
 */
async function downloadTicketPDF(ticket) {
    try {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();

        // Page settings
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
        const margin = 20;
        const contentWidth = pageWidth - (2 * margin);
        let yPosition = margin;

        // Helper function to add text
        const addText = (text, size, isBold = false, align = 'left') => {
            doc.setFontSize(size);
            doc.setFont('helvetica', isBold ? 'bold' : 'normal');

            if (align === 'center') {
                doc.text(text, pageWidth / 2, yPosition, { align: 'center' });
            } else {
                doc.text(text, margin, yPosition);
            }

            yPosition += size * 0.5;
        };

        // Add border
        doc.setLineWidth(1);
        doc.rect(10, 10, pageWidth - 20, pageHeight - 20);

        // Title
        yPosition = 30;
        addText('TIXBRO TICKET', 24, true, 'center');
        yPosition += 10;

        // Horizontal line
        doc.setLineWidth(0.5);
        doc.line(margin, yPosition, pageWidth - margin, yPosition);
        yPosition += 15;

        // Event Information
        addText('EVENT INFORMATION', 14, true);
        yPosition += 5;
        addText(`Event: ${ticket.eventTitle}`, 11);
        addText(`Date: ${formatDate(ticket.eventDate)}`, 11);
        addText(`Time: ${ticket.eventTime}`, 11);
        addText(`Venue: ${ticket.eventVenue}`, 11);
        addText(`Location: ${ticket.eventLocation}`, 11);
        yPosition += 10;

        // Horizontal line
        doc.line(margin, yPosition, pageWidth - margin, yPosition);
        yPosition += 15;

        // Customer Information
        addText('TICKET HOLDER', 14, true);
        yPosition += 5;
        addText(`Name: ${ticket.customerName}`, 11);
        addText(`Email: ${ticket.customerEmail}`, 11);
        addText(`Phone: ${ticket.customerPhone || 'N/A'}`, 11);
        yPosition += 10;

        // Horizontal line
        doc.line(margin, yPosition, pageWidth - margin, yPosition);
        yPosition += 15;

        // Ticket Details
        addText('TICKET DETAILS', 14, true);
        yPosition += 5;
        addText(`Ticket ID: ${ticket.ticketId}`, 11);
        addText(`Price: ₹${(ticket.amount || 0).toLocaleString('en-IN')}`, 11);
        addText(`Payment ID: ${ticket.paymentId}`, 11);
        addText(`Status: ${ticket.used ? 'USED' : 'VALID'}`, 11, true);
        yPosition += 15;

        // QR Code
        addText('SCAN TO VERIFY', 12, true, 'center');
        yPosition += 5;

        // Get QR code image
        const qrCanvas = document.querySelector('#qrcode canvas');
        if (qrCanvas) {
            const qrImage = qrCanvas.toDataURL('image/png');
            const qrSize = 60;
            const qrX = (pageWidth - qrSize) / 2;

            // Add QR code to PDF
            doc.addImage(qrImage, 'PNG', qrX, yPosition, qrSize, qrSize);
            yPosition += qrSize + 10;
        }

        // Footer note
        yPosition = pageHeight - 30;
        doc.setFontSize(9);
        doc.text('This ticket is valid for one-time entry only.', pageWidth / 2, yPosition, { align: 'center' });
        yPosition += 5;
        doc.text('Show this QR code at the event entrance.', pageWidth / 2, yPosition, { align: 'center' });

        // Save PDF
        doc.save(`Tixbro_Ticket_${ticket.ticketId}.pdf`);

        console.log('PDF downloaded successfully');
    } catch (error) {
        console.error('Error generating PDF:', error);
        alert('Error generating PDF. Please try again.');
    }
}

/**
 * Show error state
 */
function showError() {
    loadingState.style.display = 'none';
    errorState.style.display = 'block';
    ticketContainer.style.display = 'none';
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
