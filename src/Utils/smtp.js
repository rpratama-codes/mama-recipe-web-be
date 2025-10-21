if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({ path: __dirname + '/./../../.env.local' })
}

const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  host: process.env['SMTP_HOST'],
  port: process.env['SMTP_PORT'],
  tls: {
    rejectUnauthorized: true,
    minVersion: 'TLSv1.2'
  },
  auth: {
    user: process.env['SMTP_USER'],
    pass: process.env['SMTP_PASS']
  }
})

module.exports = transporter
