
const nodemailer = require('nodemailer');
const nodemailerConfig = require('./nodemailerConfig');


const transporter = nodemailer.createTransport(nodemailerConfig);


const sendEmail = async ({ to, subject, html }) => {
  return transporter.sendMail({
    from: 'vermashanu880@gmail.com', 
    to,
    subject,
    html,
  });
};

module.exports = sendEmail;
