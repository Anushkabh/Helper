const sendEmail = require('./sendEmail');

const sendResetPasswordEmail = async ({ name, email, token, origin }) => {
  try {
    const resetURL = `${origin}/user/reset-password?token=${token}&email=${email}`;
    const message = `<p>Please reset your password by clicking on the following link: 
    <a href="${resetURL}">Reset Password</a></p>`;

    await sendEmail({
      to: email,
      subject: 'Reset Password',
      html: `<h4>Hello, ${name}</h4>${message}`,
    });

    console.log('Reset password email sent successfully');
  } catch (error) {
    console.error('Error sending reset password email:', error);
    throw new Error('Failed to send reset password email');
  }
};

module.exports = sendResetPasswordEmail;
