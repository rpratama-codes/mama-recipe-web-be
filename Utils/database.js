const postgres = require('postgres') // import postgres
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const sql = postgres({

  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  pass: process.env.DB_PASS

})

console.log(process.env.DB_PASS)

module.exports = sql

