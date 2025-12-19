// Netlify Serverless Function to handle Stripe Webhooks
// This verifies payment success, creates tickets, and sends confirmation emails

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const brevo = require('@getbrevo/brevo');

// Webhook endpoint secret (get this from Stripe Dashboard)
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

// Initialize Brevo API clients
const emailApi = new brevo.TransactionalEmailsApi();
emailApi.setApiKey(brevo.TransactionalEmailsApiApiKeys.apiKey, process.env.BREVO_API_KEY);

const contactsApi = new brevo.ContactsApi();
contactsApi.setApiKey(brevo.ContactsApiApiKeys.apiKey, process.env.BREVO_API_KEY);

// Firebase Admin SDK for backend ticket creation
let admin;
let db;

try {
  admin = require('firebase-admin');

  // Initialize Firebase Admin if not already initialized
  if (!admin.apps.length) {
    // Check if Firebase config is provided as environment variable
    if (process.env.FIREBASE_SERVICE_ACCOUNT) {
      const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
      });
    } else {
      // Fallback: Initialize without credentials (will use default credentials)
      admin.initializeApp();
    }
  }

  db = admin.firestore();
  console.log('Firebase Admin initialized successfully');
} catch (error) {
  console.error('Firebase Admin initialization failed:', error.message);
  console.log('Webhook will log events but cannot create tickets without Firebase');
}

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
      console.log('PaymentIntent succeeded!', paymentIntent.id);

      try {
        // Extract all data from metadata
        const {
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
        } = paymentIntent.metadata;

        const ticketQuantity = parseInt(quantity) || 1;
        const totalAmount = paymentIntent.amount / 100; // Convert from paise to rupees

        console.log('Processing ticket purchase:', {
          paymentIntentId: paymentIntent.id,
          eventId,
          customerEmail,
          quantity: ticketQuantity,
          amount: totalAmount
        });

        // Create tickets in Firebase
        const ticketIds = [];

        if (db) {
          for (let i = 0; i < ticketQuantity; i++) {
            const ticketId = 'TKT-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);

            try {
              // Create ticket document
              await db.collection('tickets').doc(ticketId).set({
                ticketId: ticketId,
                eventId: eventId,
                eventTitle: eventTitle,
                customerName: customerName,
                customerEmail: customerEmail,
                customerPhone: customerPhone || '',
                purchaseDate: admin.firestore.FieldValue.serverTimestamp(),
                paymentId: paymentIntent.id,
                paymentMethod: 'stripe_card',
                paymentStatus: 'completed',
                amount: totalAmount / ticketQuantity,
                status: 'active',
                used: false,
                eventDate: eventDate,
                eventTime: eventTime,
                eventLocation: eventLocation,
                eventVenue: eventVenue
              });

              ticketIds.push(ticketId);
              console.log(`Ticket ${i + 1}/${ticketQuantity} created:`, ticketId);

            } catch (ticketError) {
              console.error(`Failed to create ticket ${i + 1}:`, ticketError);
              throw ticketError;
            }
          }

          // Update event available tickets (decrement)
          try {
            const eventRef = db.collection('events').doc(eventId);
            await eventRef.update({
              availableTickets: admin.firestore.FieldValue.increment(-ticketQuantity),
              soldTickets: admin.firestore.FieldValue.increment(ticketQuantity)
            });
            console.log(`Event ${eventId} updated: -${ticketQuantity} tickets`);
          } catch (eventError) {
            console.error('Failed to update event ticket count:', eventError);
            // Don't fail the whole process if this fails
          }

        } else {
          console.warn('Firebase not available - tickets not created');
        }

        // Send confirmation email via Brevo
        try {
          await sendConfirmationEmail({
            customerEmail,
            customerName,
            customerPhone,
            ticketIds: ticketIds.length > 0 ? ticketIds : ['PENDING'],
            eventTitle,
            eventDate,
            eventTime,
            eventLocation,
            eventVenue,
            totalAmount,
            quantity: ticketQuantity,
            paymentId: paymentIntent.id
          });
          console.log('Confirmation email sent to:', customerEmail);
        } catch (emailError) {
          console.error('Failed to send confirmation email:', emailError);
          // Don't fail webhook if email fails - tickets are already created
        }

        // Create/update contact in Brevo
        try {
          await createOrUpdateContact({
            customerEmail,
            customerName,
            customerPhone,
            eventTitle,
            ticketCount: ticketQuantity,
            totalSpent: totalAmount,
            ticketIds: ticketIds.length > 0 ? ticketIds : []
          });
          console.log('Brevo contact created/updated:', customerEmail);
        } catch (contactError) {
          console.error('Failed to create/update Brevo contact:', contactError);
          // Don't fail webhook if contact creation fails
        }

        console.log('Payment processing completed successfully!');

      } catch (error) {
        console.error('Error processing payment_intent.succeeded:', error);
        // Return 200 anyway to prevent Stripe from retrying
        // (Tickets might be partially created, we don't want duplicates)
      }

      break;

    case 'payment_intent.payment_failed':
      const failedPayment = stripeEvent.data.object;
      console.log('PaymentIntent failed:', failedPayment.id);
      console.log('Failure reason:', failedPayment.last_payment_error?.message);

      // Optionally: Send failure notification email
      // For now, just log it

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

// Helper function to send confirmation email via Brevo
async function sendConfirmationEmail(data) {
  const {
    customerEmail,
    customerName,
    customerPhone,
    ticketIds,
    eventTitle,
    eventDate,
    eventTime,
    eventLocation,
    eventVenue,
    totalAmount,
    quantity,
    paymentId
  } = data;

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('de-DE', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  // Create ticket list HTML with view links
  const ticketListHTML = ticketIds.map((ticketId, index) => `
    <tr>
      <td style="padding: 10px; border-bottom: 1px solid #eee;">
        Ticket ${index + 1}
      </td>
      <td style="padding: 10px; border-bottom: 1px solid #eee; font-family: monospace;">
        ${ticketId}
      </td>
      <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: center;">
        <a href="https://tixbro-website.netlify.app/ticket/view?id=${ticketId}"
           style="display: inline-block; padding: 8px 16px; background-color: #667eea; color: white; text-decoration: none; border-radius: 6px; font-size: 12px; font-weight: 600;">
          View Ticket
        </a>
      </td>
    </tr>
  `).join('');

  // Email HTML template
  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Ticket-Bestätigung - Tixbro</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4; padding: 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">

          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 30px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 32px;">Tixbro</h1>
              <p style="color: #ffffff; margin: 10px 0 0 0; font-size: 16px;">Ihre Ticket-Bestätigung</p>
            </td>
          </tr>

          <!-- Success Message -->
          <tr>
            <td style="padding: 30px; text-align: center;">
              <div style="display: inline-block; background-color: #10b981; color: white; padding: 12px 30px; border-radius: 50px; margin-bottom: 20px;">
                ✓ Zahlung erfolgreich
              </div>
              <h2 style="color: #333; margin: 20px 0 10px 0;">Vielen Dank für Ihren Kauf!</h2>
              <p style="color: #666; margin: 0;">Ihre Tickets wurden erfolgreich gebucht.</p>
            </td>
          </tr>

          <!-- Event Details -->
          <tr>
            <td style="padding: 0 30px 30px 30px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8f9fa; border-radius: 8px; padding: 20px;">
                <tr>
                  <td>
                    <h3 style="color: #667eea; margin: 0 0 15px 0; font-size: 20px;">${eventTitle}</h3>

                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding: 8px 0; color: #666;">
                          <strong>📅 Datum:</strong>
                        </td>
                        <td style="padding: 8px 0; color: #333; text-align: right;">
                          ${formatDate(eventDate)}
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; color: #666;">
                          <strong>🕐 Uhrzeit:</strong>
                        </td>
                        <td style="padding: 8px 0; color: #333; text-align: right;">
                          ${eventTime} Uhr
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; color: #666;">
                          <strong>📍 Ort:</strong>
                        </td>
                        <td style="padding: 8px 0; color: #333; text-align: right;">
                          ${eventLocation}
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; color: #666;">
                          <strong>🏛️ Venue:</strong>
                        </td>
                        <td style="padding: 8px 0; color: #333; text-align: right;">
                          ${eventVenue}
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Tickets -->
          <tr>
            <td style="padding: 0 30px 30px 30px;">
              <h3 style="color: #333; margin: 0 0 15px 0;">Ihre Tickets (${quantity}x)</h3>
              <table width="100%" cellpadding="0" cellspacing="0" style="border: 1px solid #eee; border-radius: 8px; overflow: hidden;">
                <thead>
                  <tr style="background-color: #f8f9fa;">
                    <th style="padding: 12px; text-align: left; color: #666; font-weight: 600;">Ticket</th>
                    <th style="padding: 12px; text-align: left; color: #666; font-weight: 600;">Ticket-ID</th>
                    <th style="padding: 12px; text-align: center; color: #666; font-weight: 600;">Action</th>
                  </tr>
                </thead>
                <tbody>
                  ${ticketListHTML}
                </tbody>
              </table>
            </td>
          </tr>

          <!-- View All Tickets Button -->
          <tr>
            <td style="padding: 0 30px 30px 30px; text-align: center;">
              <a href="https://tixbro-website.netlify.app/ticket/view?id=${ticketIds[0]}"
                 style="display: inline-block; padding: 16px 32px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; text-decoration: none; border-radius: 50px; font-size: 16px; font-weight: 700; box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);">
                🎫 View Your Ticket${quantity > 1 ? 's' : ''}
              </a>
            </td>
          </tr>

          <!-- Payment Details -->
          <tr>
            <td style="padding: 0 30px 30px 30px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8f9fa; border-radius: 8px; padding: 20px;">
                <tr>
                  <td style="padding: 8px 0; color: #666;">
                    Gesamtbetrag:
                  </td>
                  <td style="padding: 8px 0; color: #333; text-align: right; font-size: 18px; font-weight: 600;">
                    ₹${totalAmount.toLocaleString('de-DE')}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #666; font-size: 12px;">
                    Zahlungs-ID:
                  </td>
                  <td style="padding: 8px 0; color: #999; text-align: right; font-size: 12px; font-family: monospace;">
                    ${paymentId}
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Important Info -->
          <tr>
            <td style="padding: 0 30px 30px 30px;">
              <div style="background-color: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; border-radius: 4px;">
                <p style="margin: 0; color: #856404; font-size: 14px;">
                  <strong>📌 Wichtig:</strong> Bitte bewahren Sie diese E-Mail auf. Sie benötigen Ihre Ticket-ID beim Check-In am Veranstaltungsort.
                </p>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f8f9fa; padding: 30px; text-align: center; border-top: 1px solid #eee;">
              <p style="margin: 0 0 10px 0; color: #666; font-size: 14px;">
                Bei Fragen kontaktieren Sie uns unter:
              </p>
              <p style="margin: 0 0 20px 0;">
                <a href="mailto:support@tixbro.com" style="color: #667eea; text-decoration: none; font-weight: 600;">support@tixbro.com</a>
              </p>
              <p style="margin: 0; color: #999; font-size: 12px;">
                © ${new Date().getFullYear()} Tixbro. Alle Rechte vorbehalten.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;

  // Plain text version
  const textContent = `
Tixbro - Ticket-Bestätigung

Vielen Dank für Ihren Kauf!

Event: ${eventTitle}
Datum: ${formatDate(eventDate)}
Uhrzeit: ${eventTime} Uhr
Ort: ${eventLocation}
Venue: ${eventVenue}

Ihre Tickets (${quantity}x):
${ticketIds.map((id, i) => `
Ticket ${i + 1}: ${id}
View Ticket: https://tixbro-website.netlify.app/ticket/view?id=${id}
`).join('\n')}

Gesamtbetrag: ₹${totalAmount}
Zahlungs-ID: ${paymentId}

🎫 View All Your Tickets:
https://tixbro-website.netlify.app/ticket/view?id=${ticketIds[0]}

Bitte bewahren Sie diese E-Mail auf. Sie benötigen Ihre Ticket-ID beim Check-In.

Bei Fragen: support@tixbro.com

© ${new Date().getFullYear()} Tixbro
  `;

  // Send email via Brevo
  const sendSmtpEmail = new brevo.SendSmtpEmail();

  sendSmtpEmail.sender = {
    name: 'Tixbro',
    email: process.env.BREVO_FROM_EMAIL || 'noreply@tixbro.com'
  };

  sendSmtpEmail.to = [
    {
      email: customerEmail,
      name: customerName
    }
  ];

  sendSmtpEmail.subject = `✓ Ticket-Bestätigung - ${eventTitle}`;
  sendSmtpEmail.htmlContent = htmlContent;
  sendSmtpEmail.textContent = textContent;

  await emailApi.sendTransacEmail(sendSmtpEmail);
}

// Helper function to create or update contact in Brevo
async function createOrUpdateContact(data) {
  const {
    customerEmail,
    customerName,
    customerPhone,
    eventTitle,
    ticketCount,
    totalSpent,
    ticketIds
  } = data;

  const createContact = new brevo.CreateContact();

  createContact.email = customerEmail;
  createContact.attributes = {
    FIRSTNAME: customerName.split(' ')[0] || customerName,
    LASTNAME: customerName.split(' ').slice(1).join(' ') || '',
    SMS: customerPhone || '',
    LAST_EVENT: eventTitle,
    LAST_PURCHASE_DATE: new Date().toISOString().split('T')[0],
    TICKET_COUNT: ticketCount,
    TOTAL_SPENT: totalSpent,
    LAST_TICKET_IDS: ticketIds.join(', ')
  };

  createContact.updateEnabled = true;

  await contactsApi.createContact(createContact);
}
