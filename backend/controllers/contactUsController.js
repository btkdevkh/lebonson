const nodemailer = require('nodemailer')
const asyncHandler = require('express-async-handler')

const contactUs = asyncHandler(async (req, res) => {
  const { firstname, lastname, email, message } = req.body

  if(!firstname || !lastname || !email || !message) {
    res.status(400)
    throw new Error("Champs requise")
  }

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    port: 587,
    secure: false, // true for 465, false for other ports,
    tls: {
      rejectUnauthorized: false
    },
    auth: {
      user: process.env.MY_EMAIL, // generated user
      pass: process.env.MY_PASSWORD, // generated password
    }
  })

  const output = `
    <h3>Détails du visiteur</h3>
    <ul>
      <li>Prénom : ${firstname}</li>
      <li>Nom : ${lastname}</li>
      <li>Email : ${email}</li>
    </ul>
    <p>Message : ${message}</p>
  `;

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: process.env.MY_EMAIL, // sender address
    to: process.env.MY_EMAIL, // list of receivers
    subject: "Un nouveau mail du visiteur", // Subject line
    text: "",
    html: output
  })

  console.log("Message sent: %s", info.messageId);

  res.status(200).json({ status: 200, message: 'YES OK' })
})

module.exports = {
  contactUs
}
