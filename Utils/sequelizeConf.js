if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({ path: '../.env.local' })
}

module.exports = {
  development: {
    username: 'postgres',
    password: 'postgres',
    database: 'tomato_db',
    host: 'localhost',
    dialect: 'postgres'
  },
  test: {
    username: 'root',
    password: null,
    database: 'database_test',
    host: '127.0.0.1',
    dialect: 'mysql'
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres'
  }
}
