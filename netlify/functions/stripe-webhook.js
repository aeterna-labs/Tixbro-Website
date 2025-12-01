// Netlify Serverless Function to handle Stripe Webhooks
// This verifies payment success and updates the database

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Webhook endpoint secret (get this from Stripe Dashboard)
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Stripe-Signature',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  // Handle preflight OPTIONS request
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };
  }

  const sig = event.headers['stripe-signature'];

  let stripeEvent;

  try {
    // Verify webhook signature
    stripeEvent = stripe.webhooks.constructEvent(
      event.body,
      sig,
      endpointSecret
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({ error: `Webhook Error: ${err.message}` })
    };
  }

  // Handle the event
  switch (stripeEvent.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = stripeEvent.data.object;
      console.log('PaymentIntent was successful!', paymentIntent.id);

      // Extract metadata
      const { eventId, eventTitle, customerEmail } = paymentIntent.metadata;

      // Here you would update your database (Firebase Firestore)
      // For now, just log the success
      console.log('Payment succeeded for:', {
        paymentIntentId: paymentIntent.id,
        amount: paymentIntent.amount / 100,
        currency: paymentIntent.currency,
        eventId,
        eventTitle,
        customerEmail
      });

      // TODO: Update Firestore to mark ticket as paid
      // TODO: Send confirmation email to customer

      break;

    case 'payment_intent.payment_failed':
      const failedPayment = stripeEvent.data.object;
      console.log('PaymentIntent failed:', failedPayment.id);
      console.log('Failure reason:', failedPayment.last_payment_error?.message);

      // TODO: Update database to mark payment as failed
      // TODO: Send failure notification to customer

      break;

    case 'charge.succeeded':
      const charge = stripeEvent.data.object;
      console.log('Charge succeeded:', charge.id);
      break;

    default:
      console.log(`Unhandled event type ${stripeEvent.type}`);
  }

  // Return a 200 response to acknowledge receipt of the event
  return {
    statusCode: 200,
    headers,
    body: JSON.stringify({ received: true })
  };
};
