// Netlify Serverless Function to send ticket confirmation emails
// Uses SendGrid for email delivery

const sgMail = require('@sendgrid/mail');

// Initialize SendGrid with API key from environment variable
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

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
      customerEmail,
      customerName,
      ticketIds,
      eventTitle,
      eventDate,
      eventTime,
      eventLocation,
      eventVenue,
      totalAmount,
      quantity,
      paymentId
    } = JSON.parse(event.body);

    // Validate required fields
    if (!customerEmail || !customerName || !ticketIds || !eventTitle) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({
          error: 'Missing required fields: customerEmail, customerName, ticketIds, eventTitle'
        })
      };
    }

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

    // Create ticket list HTML
    const ticketListHTML = ticketIds.map((ticketId, index) => `
      <tr>
        <td style="padding: 10px; border-bottom: 1px solid #eee;">
          Ticket ${index + 1}
        </td>
        <td style="padding: 10px; border-bottom: 1px solid #eee; font-family: monospace;">
          ${ticketId}
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
                  </tr>
                </thead>
                <tbody>
                  ${ticketListHTML}
                </tbody>
              </table>
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

          <!-- QR Code Placeholder -->
          <tr>
            <td style="padding: 0 30px 30px 30px; text-align: center;">
              <div style="background-color: #f8f9fa; padding: 30px; border-radius: 8px;">
                <p style="color: #666; margin: 0 0 10px 0; font-size: 14px;">QR-Code für schnellen Check-In</p>
                <div style="background-color: #fff; padding: 20px; display: inline-block; border: 2px dashed #ddd; border-radius: 8px;">
                  <p style="margin: 0; color: #999; font-size: 12px;">QR-Code wird beim Check-In am Veranstaltungsort gescannt</p>
                  <p style="margin: 10px 0 0 0; color: #667eea; font-weight: 600;">Ticket-ID: ${ticketIds[0]}</p>
                </div>
              </div>
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

    // Plain text version (fallback)
    const textContent = `
Tixbro - Ticket-Bestätigung

Vielen Dank für Ihren Kauf!

Event: ${eventTitle}
Datum: ${formatDate(eventDate)}
Uhrzeit: ${eventTime} Uhr
Ort: ${eventLocation}
Venue: ${eventVenue}

Ihre Tickets (${quantity}x):
${ticketIds.map((id, i) => `Ticket ${i + 1}: ${id}`).join('\n')}

Gesamtbetrag: ₹${totalAmount}
Zahlungs-ID: ${paymentId}

Bitte bewahren Sie diese E-Mail auf. Sie benötigen Ihre Ticket-ID beim Check-In.

Bei Fragen: support@tixbro.com

© ${new Date().getFullYear()} Tixbro
    `;

    // Send email using SendGrid
    const msg = {
      to: customerEmail,
      from: {
        email: process.env.SENDGRID_FROM_EMAIL || 'noreply@tixbro.com',
        name: 'Tixbro'
      },
      subject: `✓ Ticket-Bestätigung - ${eventTitle}`,
      text: textContent,
      html: htmlContent
    };

    await sgMail.send(msg);

    console.log('Confirmation email sent to:', customerEmail);
    console.log('Ticket IDs:', ticketIds);

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        message: 'Confirmation email sent successfully',
        recipient: customerEmail
      })
    };

  } catch (error) {
    console.error('Error sending confirmation email:', error);

    // Check if it's a SendGrid specific error
    if (error.response) {
      console.error('SendGrid error:', error.response.body);
    }

    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Failed to send confirmation email',
        message: error.message
      })
    };
  }
};
