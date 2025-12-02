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
export async function processStripePayment(customerData, cardElement) {
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

        // Validate quantity
        const quantity = checkoutData.quantity || 1;
        if (quantity < 1) {
            throw new Error('Invalid quantity');
        }

        // Step 1: Create Payment Intent on backend
        const response = await fetch('/.netlify/functions/create-payment-intent', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                amount: checkoutData.totalAmount,
                currency: 'inr',
                eventId: checkoutData.eventId,
                eventTitle: checkoutData.eventTitle,
                customerEmail: customerData.email
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to create payment intent');
        }

        const { clientSecret, paymentIntentId } = await response.json();

        // Step 2: Confirm payment with card details
        const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: cardElement,
                    billing_details: {
                        name: `${customerData.firstName} ${customerData.lastName}`,
                        email: customerData.email,
                        phone: customerData.phone
                    }
                }
            }
        );

        if (confirmError) {
            throw new Error(confirmError.message);
        }

        // Step 3: Verify payment succeeded
        if (paymentIntent.status !== 'succeeded') {
            throw new Error('Payment was not successful. Please try again.');
        }

        // Step 4: Create tickets in Firestore (handle multiple tickets if quantity > 1)
        const paymentData = {
            paymentId: paymentIntent.id,
            paymentMethod: 'stripe_card',
            paymentStatus: 'completed'
        };

        // Prepare customer data with full name
        const ticketCustomerData = {
            ...customerData,
            name: `${customerData.firstName} ${customerData.lastName}`
        };

        // Create tickets (one by one if quantity > 1)
        const ticketIds = [];
        const quantity = checkoutData.quantity || 1;

        // Create tickets sequentially (Firestore transaction handles availability check)
        for (let i = 0; i < quantity; i++) {
            const ticketResult = await purchaseTicket(
                checkoutData.eventId,
                ticketCustomerData,
                paymentData
            );

            if (!ticketResult.success) {
                // If ticket creation fails, we should ideally refund the payment
                // For now, throw error and let Stripe handle it
                throw new Error(`Failed to create ticket ${i + 1} of ${quantity}: ${ticketResult.error}`);
            }

            ticketIds.push(ticketResult.ticketId);
        }

        const mainTicketId = ticketIds[0];

        // Clear checkout data
        sessionStorage.removeItem('checkoutEvent');

        // Store ticket info for success page
        sessionStorage.setItem('purchasedTicket', JSON.stringify({
            ticketId: mainTicketId,
            ticketIds: ticketIds, // All ticket IDs if multiple
            paymentId: paymentIntent.id,
            ...checkoutData,
            ...customerData
        }));

        return {
            success: true,
            ticketId: mainTicketId,
            ticketIds: ticketIds,
            ticketCount: ticketIds.length
        };

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
