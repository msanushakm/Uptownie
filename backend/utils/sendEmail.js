const nodemailer = require("nodemailer");

const sendEmail = async (to, subject, html, attachmentPath = null) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER, 
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject,
    html,
    attachments: attachmentPath
      ? [
          {
            filename: "invoice.pdf",
            path: attachmentPath,
          },
        ]
      : [],
  });
};

module.exports = sendEmail;