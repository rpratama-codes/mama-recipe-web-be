const postgres = require('postgres') // import postgres

const sql = postgres({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  pass: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
})

module.exports = sql

// export dalam variable sql

