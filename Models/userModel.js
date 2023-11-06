const database = require('../Utils/database')

const bcrypt = require('bcrypt')

const userModels = {

  modelCheckEmail: async (email) => {
    try {
      const request = await database`SELECT email FROM users WHERE email = ${email}`
      return request
    } catch (error) {
      console.log(error)
    }
  },

  modelUserRegister: async (payload) => {
    const { firstName, lastName, role, email, userUuid, password, photoProfile } = payload
    const saltRounds = 3
    const salt = bcrypt.genSaltSync(saltRounds)
    const hash = bcrypt.hashSync(password, salt)
    const request = await database`INSERT INTO users(first_name, last_name, role, email, user_uid, password, photo_profile)
      VALUES (${firstName}, ${lastName},${role}, ${email},${userUuid},${hash},${photoProfile}) returning user_uid;`
    return request
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
