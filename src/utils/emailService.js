import emailjs from '@emailjs/browser';

// ==========================================
// EMAILJS CONFIGURATION
// ==========================================
// IMPORTANT: You must replace these placeholders with your actual 
// keys from your EmailJS account (https://www.emailjs.com/)
const EMAILJS_SERVICE_ID = 'service_nxkg3gd';
const EMAILJS_TEMPLATE_ID = 'template_k7zvjgm';
const EMAILJS_PUBLIC_KEY = 'rcMGYa6u5a5PZTvtf';

/**
 * Sends a booking confirmation email to the user.
 * 
 * @param {Object} bookingDetails - The details of the booking.
 * @param {Object} eventDetails - The details of the booked event.
 * @param {string} userEmail - The email address to send the confirmation to.
 * @param {string} userName - The name of the user.
 */
export const sendBookingEmail = async (bookingDetails, eventDetails, userEmail, userName) => {
  // If the keys are still placeholders, we log it and abort so it doesn't crash the app
  if (EMAILJS_SERVICE_ID === 'YOUR_SERVICE_ID') {
    console.warn("EmailJS is not configured yet. Please update src/utils/emailService.js with your real keys to actually send emails.");
    return false;
  }

  // The templateParams object keys MUST match the variable names you set up 
  // in your EmailJS template (e.g. {{event_name}}, {{booking_id}}, etc.)
  const templateParams = {
    to_email: userEmail,
    to_name: userName || 'Valued Guest',
    event_name: eventDetails.name,
    booking_id: bookingDetails.bookingId,
    tickets: bookingDetails.tickets,
    total_cost: bookingDetails.totalAmount,
    date: eventDetails.date,
    time: eventDetails.time,
    venue: eventDetails.venue,
  };

  try {
    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams,
      EMAILJS_PUBLIC_KEY
    );
    console.log('SUCCESS! Email sent.', response.status, response.text);
    return true;
  } catch (error) {
    console.error('FAILED to send email...', error);
    return false;
  }
};
