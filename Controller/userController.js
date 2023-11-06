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
      // generate uuid user
      const { v4: uuidv4 } = require('uuid')
      const userUuid = uuidv4()

      // default role
      const role = 'user'

      // default photo profile
      const photoProfile = 'https://cdn.iconscout.com/icon/free/png-256/free-avatar-370-456322.png'

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
        userUid: Joi.string().guid({
          version: [
            'uuidv4',
            'uuidv5'
          ]
        }),
        password: Joi.string()
          // eslint-disable-next-line prefer-regex-literals
          .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
      })

      await schema.validateAsync(req.body)

      const checkEmail = await userModels.modelCheckEmail(email)

      if (checkEmail.length > 0) {
        // eslint-disable-next-line no-throw-literal
        throw { type: 'hasdata', message: 'email already registered' }
      }

      const request = await userModels.modelUserRegister({ firstName, lastName, role, email, userUuid, password, photoProfile })
      res.status(200).send({
        status: true,
        message: 'succes',
        data: request
      })
    } catch (error) {
      if (error.type === 'hasdata') {
        res.status(409).json({
          status: false,
          massage: 'email already registered'
        })
        return
      }
      res.status(422).send({
        status: false,
        message: error.message

      })
    }
  },
  _userLogin: async (req, res) => {
    try {
      const { email, password } = req.body

      const checkMail = await userModels.modelCheckEmail(email)
      if (!checkMail.length) {
        // eslint-disable-next-line no-throw-literal
        throw { type: 'nodata', message: 'email not found, please register first' }
      }

      console.log(checkMail[0].password)

      const isPassMatch = bcrypt.compareSync(password, checkMail[0].password)

      if (isPassMatch) {
        const token = jwt.sign(checkMail[0], process.env.APP_SECRET_TOKEN)
        res.status(200).send({
          status: true,
          result: checkMail[0],
          message: 'Login Succes !',
          keyToken: token
        })
      } else {
        res.status(401).send({
          status: false,
          message: 'Wrong Password !!!'
        })
      }
    } catch (error) {
      if (error.type === 'nodata') {
        res.status(404).json({
          status: false,
          massage: 'email not found, please register first'
        })
      }
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
