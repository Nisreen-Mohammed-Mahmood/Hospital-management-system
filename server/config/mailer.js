const nodemailer = require("nodemailer");

// Create a transporter using SMTP (configure with your email service)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Function to send emails
const sendEmail = async (to, subject, text, html) => {
  const mailOptions = {
    from: "Jozefbedoui@gmail.com",
    to: to,
    subject: subject,
    text: text,
    html: html,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

module.exports = sendEmail;
