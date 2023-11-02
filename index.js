/* eslint-disable camelcase */
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const bodyParser = require('body-parser')
const express = require('express')
const cors = require('cors')
const router = require('./Routers')
const { default: helmet } = require('helmet')

const app = express()
const port = process.env.APP_PORT | 3000

// MIDDLEWARE
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors({ origin: 'localhost' }))
app.use(helmet({ crossOriginResourcePolicy: { policy: 'same-site' } }))
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: false }))

// Router
app.use(router)

app.listen(port, () => {
  console.log(`App running on http://localhost:${port}`)
})
