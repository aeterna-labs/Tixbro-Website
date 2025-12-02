// Netlify Serverless Function to create Stripe Payment Intent
// This runs on the server-side and keeps the Secret Key secure

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event, context) => {
  // Enable CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
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

  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };
  }

  try {
    // Parse request body
    const {
      amount,
      currency,
      eventId,
      eventTitle,
      customerEmail,
      customerName,
      customerPhone,
      eventDate,
      eventTime,
      eventLocation,
      eventVenue,
      quantity
    } = JSON.parse(event.body);

    // Validate required fields
    if (!amount || !currency) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Missing required fields: amount and currency' })
      };
    }

    // Validate amount (must be positive integer)
    if (typeof amount !== 'number' || amount <= 0) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Invalid amount. Must be a positive number.' })
      };
    }

    // Create Payment Intent with comprehensive metadata for webhook
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // Convert to smallest currency unit (paise for INR)
      currency: currency || 'inr',
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        eventId: eventId || '',
        eventTitle: eventTitle || '',
        customerEmail: customerEmail || '',
        customerName: customerName || '',
        customerPhone: customerPhone || '',
        eventDate: eventDate || '',
        eventTime: eventTime || '',
        eventLocation: eventLocation || '',
        eventVenue: eventVenue || '',
        quantity: String(quantity || 1) // metadata values must be strings
      },
      description: `Ticket purchase for ${eventTitle || 'event'}`,
      receipt_email: customerEmail || null
    });

    // Return client secret to frontend
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id
      })
    };

  } catch (error) {
    console.error('Error creating payment intent:', error);

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Failed to create payment intent',
        message: error.message
      })
    };
  }
};
