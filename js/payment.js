// Payment Processing with Stripe for Tixbro
import { getStripe } from './stripe-config.js';
import { purchaseTicket } from './tickets.js';
import { getEvent, incrementEventClicks } from './events.js';

// Create Stripe Checkout Session for ticket purchase
export async function createCheckoutSession(eventId, quantity = 1) {
    try {
        // Get event details
        const eventResult = await getEvent(eventId);
        if (!eventResult.success) {
            throw new Error('Event not found');
        }

        const event = eventResult.event;

        // Check if tickets are available
        if (event.availableTickets < quantity) {
            throw new Error('Not enough tickets available');
        }

        // Calculate total amount (in paise for INR)
        const amountInPaise = Math.round(event.price * quantity * 100);

        // For demo purposes, we'll redirect to a checkout page
        // In production, you would create a Stripe Checkout Session via your backend

        // Store checkout info in sessionStorage
        sessionStorage.setItem('checkoutEvent', JSON.stringify({
            eventId: eventId,
            eventTitle: event.title,
            price: event.price,
            quantity: quantity,
            totalAmount: event.price * quantity,
            eventDate: event.date,
            eventTime: event.time,
            eventLocation: event.location,
            eventVenue: event.venue
        }));

        // Redirect to checkout page
        window.location.href = 'checkout.html';

        return { success: true };
    } catch (error) {
        console.error('Checkout error:', error);
        return { success: false, error: error.message };
    }
}

// Process payment (called from checkout page)
export async function processStripePayment(customerData) {
    try {
        const stripe = getStripe();
        if (!stripe) {
            throw new Error('Stripe not initialized');
        }

        // Get checkout data from sessionStorage
        const checkoutData = JSON.parse(sessionStorage.getItem('checkoutEvent'));
        if (!checkoutData) {
            throw new Error('No checkout data found');
        }

        // In production, you would:
        // 1. Create a Stripe Checkout Session on your backend
        // 2. Return the session ID
        // 3. Redirect to Stripe Checkout using stripe.redirectToCheckout()

        // For now, we'll simulate a successful payment
        // and create the ticket directly

        const paymentData = {
            paymentId: 'stripe_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9),
            paymentMethod: 'stripe_card'
        };

        // Create ticket in Firestore
        const ticketResult = await purchaseTicket(
            checkoutData.eventId,
            customerData,
            paymentData
        );

        if (ticketResult.success) {
            // Clear checkout data
            sessionStorage.removeItem('checkoutEvent');

            // Store ticket info for success page
            sessionStorage.setItem('purchasedTicket', JSON.stringify({
                ticketId: ticketResult.ticketId,
                ...checkoutData,
                ...customerData
            }));

            return { success: true, ticketId: ticketResult.ticketId };
        } else {
            throw new Error(ticketResult.error);
        }

    } catch (error) {
        console.error('Payment processing error:', error);
        return { success: false, error: error.message };
    }
}

// Verify payment (for webhook handling in future)
export async function verifyPayment(sessionId) {
    // This would be handled by backend webhook
    // For now, just return success
    return { success: true };
}
