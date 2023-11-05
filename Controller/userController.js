// import model for acces database
const userModels = require('../Models/userModel')
// import jwt for make token
const jwt = require('jsonwebtoken')
// import bcrypt for compare password from user with database
const bcrypt = require('bcrypt')
// import joi untuk validasi
const Joi = require('joi').extend(require('@joi/date'))

const userControllers = {
  _userRegister: async (req, res) => {
    try {
      const { firstName, lastName, email, password } = req.body
      const schema = Joi.object({
        firstName: Joi.string()
          .min(6)
          .max(15)
          .required(),
        lastName: Joi.string()
          .min(6)
          .max(15)
          .required(),
        email: Joi.string()
          .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
        password: Joi.string()
          .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
      })

      await schema.validateAsync(req.body)

      const checkEmail = await userModels.modelCheckEmail(email)
      if (checkEmail.length > 0) {
        res.send({
          status: false,
          message: 'Email Already Registered'
        })

        return
      }

      const request = await userModels.modelUserRegister({ firstName, lastName, email, password })
      res.status(200).send({
        status: true,
        message: 'succes',
        data: request
      })
    } catch (error) {
      res.status(500).send({
        status: false,
        message: error
      })
    }
  },
  _userLogin: async (req, res) => {
    try {
      const { email, password } = req.body

      const checkMail = await userModels.modelCheckEmail(email)
      if (!checkMail.length) {
        res.status(404).send({
          status: false,
          message: 'email not found, please register first'
        })
      }

      console.log(checkMail[0].password)

      const isPassMatch = bcrypt.compareSync(password, checkMail[0].password)

      if (isPassMatch) {
        const token = jwt.sign(checkMail[0], process.env.APP_SECRET_TOKEN)
        res.status(200).send({
          status: true,
          message: 'Login Succes !',
          keyToken: token
        })
      } else {
        res.status(404).send({
          status: false,
          message: 'Wrong Password !!!'
        })
      }
    } catch (error) {
      console.log(error)
    }
  },
  _userLoginProfile: async (req, res) => {
    const token = req.headers.authorization.slice(7)
    console.log(token)
    const decoded = jwt.verify(token, process.env.APP_SECRET_TOKEN)
    const request = await userModels.modelDetailUser(decoded)
    res.status(200).send({
      status: true,
      message: 'Please Keep Your Data Save',
      data: request
    })
  }
}

module.exports = userControllers
