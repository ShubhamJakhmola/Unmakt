import type { Handler } from '@netlify/functions';
import { handleOptions, jsonResponse } from './utils/http';

export const handler: Handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') return handleOptions();
  if (event.httpMethod !== 'POST') {
    return jsonResponse(405, { error: 'Method not allowed' });
  }

  // Hardcoded Mailjet credentials for testing
  const MJ_API_KEY = 'b533f12e9d9dd0803783378b2004d5d6';
  const MJ_SECRET_KEY = 'e34c1575b18cea8790b117feebfc1ac6';

  try {
    // First, let's test the API credentials by checking account info
    const auth = Buffer.from(`${MJ_API_KEY}:${MJ_SECRET_KEY}`).toString('base64');
    
    console.log('Testing Mailjet API credentials...');
    
    // Test API access with a simple GET request
    const testResponse = await fetch('https://api.mailjet.com/v3/REST/sender', {
      method: 'GET',
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/json'
      }
    });

    console.log('API Test Response:', testResponse.status, testResponse.statusText);
    const testText = await testResponse.text();
    console.log('API Test Body:', testText);

    let senderData: any = null;
    try {
      senderData = testText ? JSON.parse(testText) : null;
    } catch {}

    if (!testResponse.ok) {
      return jsonResponse(502, {
        error: 'API credentials test failed',
        status: testResponse.status,
        message: 'Your API keys may be invalid or for a subaccount that needs separate sender verification',
        details: senderData,
        instructions: 'Check: 1) API keys are correct, 2) If using subaccount keys, verify senders in that subaccount, 3) Account is active'
      });
    }

    // Parse request body
    const body = event.body ? JSON.parse(event.body) : {};
    const type = typeof body.type === 'string' ? body.type : 'contact';

    let subject = '';
    let htmlContent = '';
    let textContent = '';

    // Email addresses
    const TEAM_EMAIL = 'unmakt.info@gmail.com';
    const FROM_EMAIL = 'nutrihealthmania@gmail.com';
    const FROM_NAME = 'Unmakt Website';

    // Build email content based on type
    if (type === 'subscribe') {
      const email = String(body.email || '').trim();
      if (!email) {
        return jsonResponse(400, { error: 'Email is required' });
      }
      subject = 'New Newsletter Subscription';
      htmlContent = `<h2>New Newsletter Subscription</h2><p><strong>Email:</strong> ${email}</p>`;
      textContent = `New Newsletter Subscription\nEmail: ${email}`;
    } else {
      const name = String(body.name || '').trim();
      const email = String(body.email || '').trim();
      const phone = String(body.phone || '').trim();
      const message = String(body.message || '').trim();

      if (!name || !email || !message) {
        return jsonResponse(400, { error: 'Name, email, and message are required' });
      }

      subject = `Contact Form: ${name}`;
      htmlContent = `<h2>New Contact Form Submission</h2><p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Phone:</strong> ${phone || 'Not provided'}</p><p><strong>Message:</strong></p><p>${message}</p>`;
      textContent = `Name: ${name}\nEmail: ${email}\nPhone: ${phone || 'Not provided'}\nMessage: ${message}`;
    }

    // Mailjet API v3.1 payload - SIMPLIFIED
    const payload = {
      Messages: [
        {
          From: {
            Email: FROM_EMAIL,
            Name: FROM_NAME
          },
          To: [
            {
              Email: TEAM_EMAIL,
              Name: 'Team'
            }
          ],
          Subject: subject,
          TextPart: textContent,
          HTMLPart: htmlContent
        }
      ]
    };

    console.log('Sending email...', JSON.stringify(payload, null, 2));

    // Send email via Mailjet v3.1 API
    const response = await fetch('https://api.mailjet.com/v3.1/send', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    console.log('Send response status:', response.status, response.statusText);

    const responseText = await response.text();
    console.log('Send response body:', responseText);

    let responseData: any = null;
    if (responseText && responseText.trim().length > 0) {
      try {
        responseData = JSON.parse(responseText);
      } catch (parseError) {
        responseData = { rawResponse: responseText };
      }
    }

    if (response.status === 404) {
      return jsonResponse(502, {
        error: 'Mailjet 404 Error',
        message: 'This is most likely a sender verification issue',
        possibleCauses: [
          'If these are SUBACCOUNT API keys, the sender must be verified in THAT specific subaccount',
          'Sender domain not validated',
          'Account in sandbox mode without proper setup'
        ],
        senderInfo: senderData,
        instructions: [
          '1. Log into Mailjet with these API credentials',
          '2. Go to Account Settings > Sender addresses & domains',
          '3. Verify nutrihealthmania@gmail.com for THIS account/subaccount',
          '4. Or add and verify a custom domain email'
        ],
        details: responseData
      });
    }

    if (!response.ok) {
      return jsonResponse(502, {
        error: 'Mailjet API Error',
        status: response.status,
        message: responseData?.ErrorMessage || responseData?.Message || response.statusText,
        details: responseData
      });
    }

    return jsonResponse(200, {
      success: true,
      message: 'Email sent successfully',
      data: responseData
    });

  } catch (error) {
    console.error('Handler error:', error);
    return jsonResponse(500, {
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};