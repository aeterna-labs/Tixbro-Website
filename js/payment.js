// Payment Processing with Stripe for Tixbro
// Manual workflow: Payment → Order saved in Firebase → Manual ticket creation
import { getStripe } from './stripe-config.js';
import { getEvent, incrementEventClicks } from './events.js';
import { db } from './firebase-config.js';
import { collection, addDoc, serverTimestamp } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js';

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
                customerEmail: customerData.email,
                customerName: `${customerData.firstName} ${customerData.lastName}`,
                customerPhone: customerData.phone || '',
                eventDate: checkoutData.eventDate,
                eventTime: checkoutData.eventTime,
                eventLocation: checkoutData.eventLocation,
                eventVenue: checkoutData.eventVenue,
                quantity: quantity
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

        // Step 4: Save order to Firebase for manual processing
        console.log('Payment successful! Saving order to Firebase...');

        const orderId = await saveOrderToFirebase({
            paymentId: paymentIntent.id,
            customerFirstName: customerData.firstName,
            customerLastName: customerData.lastName,
            customerEmail: customerData.email,
            customerPhone: customerData.phone || '',
            eventId: checkoutData.eventId,
            eventTitle: checkoutData.eventTitle,
            eventDate: checkoutData.eventDate,
            eventTime: checkoutData.eventTime,
            eventLocation: checkoutData.eventLocation,
            eventVenue: checkoutData.eventVenue,
            quantity: quantity,
            totalAmount: checkoutData.totalAmount,
            currency: 'INR'
        });

        console.log('Order saved to Firebase:', orderId);

        // Clear checkout data
        sessionStorage.removeItem('checkoutEvent');

        // Store order info for success page
        sessionStorage.setItem('purchasedTicket', JSON.stringify({
            orderId: orderId,
            paymentId: paymentIntent.id,
            customerEmail: customerData.email,
            customerName: `${customerData.firstName} ${customerData.lastName}`,
            quantity: quantity,
            totalAmount: checkoutData.totalAmount,
            eventTitle: checkoutData.eventTitle,
            eventDate: checkoutData.eventDate,
            eventTime: checkoutData.eventTime,
            eventLocation: checkoutData.eventLocation,
            eventVenue: checkoutData.eventVenue,
            manualProcessing: true // Indicates tickets will be sent manually
        }));

        return {
            success: true,
            orderId: orderId,
            paymentId: paymentIntent.id,
            message: 'Payment successful! You will receive your tickets via email within 24 hours.'
        };

    } catch (error) {
        console.error('Payment processing error:', error);
        return { success: false, error: error.message };
    }
}

// Save order to Firebase (for manual ticket creation)
async function saveOrderToFirebase(orderData) {
    try {
        const ordersRef = collection(db, 'orders');

        const order = {
            // Order Info
            orderId: 'ORD-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9),
            status: 'paid', // paid, tickets_created, tickets_sent, completed

            // Payment Info
            paymentId: orderData.paymentId,
            paymentStatus: 'completed',
            paymentMethod: 'stripe_card',
            currency: orderData.currency,
            totalAmount: orderData.totalAmount,

            // Customer Info
            customerFirstName: orderData.customerFirstName,
            customerLastName: orderData.customerLastName,
            customerEmail: orderData.customerEmail,
            customerPhone: orderData.customerPhone,

            // Event Info
            eventId: orderData.eventId,
            eventTitle: orderData.eventTitle,
            eventDate: orderData.eventDate,
            eventTime: orderData.eventTime,
            eventLocation: orderData.eventLocation,
            eventVenue: orderData.eventVenue,

            // Ticket Info
            quantity: orderData.quantity,
            ticketsCreated: false, // Admin creates tickets manually
            ticketsSent: false, // Admin sends tickets manually
            ticketIds: [], // Will be filled when tickets are created

            // Timestamps
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
        };

        const docRef = await addDoc(ordersRef, order);
        console.log('Order saved with ID:', docRef.id);

        return order.orderId;

    } catch (error) {
        console.error('Error saving order to Firebase:', error);
        throw new Error('Failed to save order: ' + error.message);
    }
}
