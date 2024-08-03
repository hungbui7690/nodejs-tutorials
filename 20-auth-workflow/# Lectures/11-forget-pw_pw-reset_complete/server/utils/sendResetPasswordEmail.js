const sendEmail = require('./sendEmail')

// (2) xong vào front-end để test >> sang authController.js
const sendResetPasswordEmail = async ({ name, email, token, origin }) => {
  const resetURL = `${origin}/user/reset-password?token=${token}&email=${email}`

  const message = `
   <p>
    Please reset password by clicking on the following link: 
    <a href="${resetURL}">Reset Password</a>
   </p>
 `

  return sendEmail({
    to: email,
    subject: 'Reset Password',
    html: `
      <h4>Hello ${name}</h4>
      ${message}
    `,
  })
}

module.exports = sendResetPasswordEmail
