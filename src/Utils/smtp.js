if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({ path: __dirname + '/./../../.env.local' })
}

const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GOOGLE_EMAIL,
    pass: process.env.GOOGLE_APP_PASSWORD
  }
})

module.exports = transporter
