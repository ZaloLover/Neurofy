// server/utils/emailSender.js
const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  // For development, use a service like Mailtrap
  // For production, use a real email service (Gmail, SendGrid, etc.)
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.mailtrap.io',
    port: process.env.EMAIL_PORT || 2525,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD
    }
  });

  const message = {
    from: `${process.env.EMAIL_FROM_NAME} <${process.env.EMAIL_FROM}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
    html: options.html
  };

  await transporter.sendMail(message);
};

module.exports = sendEmail;