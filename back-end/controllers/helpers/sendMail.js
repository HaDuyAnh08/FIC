const nodemailer = require("nodemailer");

// Create a test account or replace with real credentials.
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
    user: "dongvandungst@gmail.com",
    pass: "pktcxdhicjpofeqx",
  },
});

// Wrap in an async IIFE so we can use await.
async function sendMail( to, subject, text,html) {
  const info = await transporter.sendMail({
    from: '"LIBERO Library" <dongvandungst@gmail.com>',
    to, 
    subject,
    text,
    html,
  })
}
module.exports = { sendMail };