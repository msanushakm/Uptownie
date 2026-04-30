const nodemailer = require("nodemailer");

const sendEmail = async (to, subject, html, attachment = null) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  let attachments = [];

  if (attachment) {
    if (attachment.path) {
      attachments.push({
        filename: "invoice.pdf",
        path: attachment.path,
      });
    } else if (attachment.content) {
      attachments.push({
        filename: "invoice.pdf",
        content: attachment.content,
      });
    }
  }

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject,
    html,
    attachments,
  });
};

module.exports = sendEmail;