const database = require('../Utils/database')

const bcrypt = require('bcrypt')

const userModels = {

  modelCheckEmail: async (email) => {
    try {
      const request = await database`SELECT * FROM users WHERE email = ${email}`
      return request
    } catch (error) {

    }
  },

  modelUserRegister: async (payload) => {
    try {
      const { firstName, lastName, role, verified, phoneNumber, email, userUid, password, photoProfile, createAt, updateAt } = payload
      const saltRounds = 10
      const salt = bcrypt.genSaltSync(saltRounds)
      const hash = bcrypt.hashSync(password, salt)
      const request = await database`INSERT INTO users(first_name, last_name, role, verified, phone_number, email, user_uid, password, photo_profile, created_at, update_at)
      VALUES (${firstName}, ${lastName}, ${role}, ${verified}, ${phoneNumber}, ${email}, ${userUid},${hash}, ${photoProfile}, ${createAt}, ${updateAt});`
      return request
    } catch (error) {
      console.log(error)
    }
  }

}

module.exports = userModels
