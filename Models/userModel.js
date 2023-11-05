const database = require('../Utils/database')

const bcrypt = require('bcrypt')

const userModels = {

  modelCheckEmail: async (email) => {
    try {
      const request = await database`SELECT * FROM users WHERE email = ${email}`
      return request
    } catch (error) {
      console.log(error)
    }
  },

  modelUserRegister: async (payload) => {
    try {
      const { firstName, lastName, email, password } = payload
      const saltRounds = 10
      const salt = bcrypt.genSaltSync(saltRounds)
      const hash = bcrypt.hashSync(password, salt)
      const request = await database`INSERT INTO users(first_name, last_name, email, password)
      VALUES (${firstName}, ${lastName}, ${email},${hash});`
      return request
    } catch (error) {
      console.log(error)
    }
  },

  modelDetailUser: async (decoded) => {
    try {
      const request = await database`SELECT first_name,last_name,role,email,photo_profile FROM users WHERE id = ${decoded.id}`
      return request
    } catch (error) {
      console.log(error)
    }
  }

}

module.exports = userModels
