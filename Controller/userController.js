/* eslint-disable no-throw-literal */
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
        firstName: Joi.string().min(1).max(20).required(),
        lastName: Joi.string().min(1).max(20).required(),
        email: Joi.string().email().required(),
        password: Joi.string().required()
      })

      await schema.validateAsync(req.body)

      const checkEmail = await userModels.modelCheckEmail(email)

      if (checkEmail.length > 0) {
        throw { type: 'hasdata', message: 'email already registered' }
      }

      const request = await userModels.modelUserRegister({ firstName, lastName, role, email, userUuid, password, photoProfile })

      res.status(201).send({
        status: 201,
        message: 'succes',
        data: request
      })
    } catch (error) {
      if (error.type === 'hasdata') {
        res.status(409).json({
          status: false,
          massage: 'email already registered'
        })
      } else if (
        error.message.includes('is not allowed to be empty') ||
        error.message.includes('must be a valid email') ||
        error.message.includes('length must be less than or equal')) {
        res.status(422).send({
          status: false,
          message: error.message
        })
      } else {
        console.log(error)
        res.status(500).send({
          status: false,
          message: 'internal server error'
        })
      }
    }
  },
  _userLogin: async (req, res) => {
    try {
      const { email, password } = req.body

      const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required()
      })

      await schema.validateAsync(req.body)

      const checkMail = await userModels.modelCheckEmail(email)

      if (checkMail.length === 0) {
        throw { type: 'nodata', message: 'email not found, please register first' }
      }

      const isPassMatch = bcrypt.compareSync(password, checkMail[0].password)

      if (!isPassMatch) {
        throw { message: 'wrong password' }
      }

      const data = {
        user_uid: checkMail[0].user_uid,
        first_name: checkMail[0].first_name,
        last_name: checkMail[0].last_name,
        photo_profile: checkMail[0].photo_profile

      }
      const token = jwt.sign(data, process.env.APP_SECRET_TOKEN)
      res.status(200).send({
        status: true,
        message: 'Login Succes !',
        data,
        token
      })
    } catch (error) {
      if (error.type === 'nodata') {
        res.status(404).json({
          status: false,
          massage: 'email not found, please register first'
        })
      } else if (error.message === 'wrong password') {
        res.status(401).send({
          status: false,
          message: 'Wrong Password !!!'
        })
      } else if (
        error.message.includes('is not allowed to be empty') ||
        error.message.includes('must be a valid email')) {
        res.status(422).send({
          status: false,
          message: error.message
        })
      }
    }
  },
  _userLoginProfile: async (req, res) => {
    const token = req.headers.authorization.slice(7)
    const decoded = jwt.verify(token, process.env.APP_SECRET_TOKEN)
    const request = await userModels.modelDetailUser(decoded)
    res.status(200).send({
      status: true,
      message: 'ok',
      data: request
    })
  }
}

module.exports = userControllers
