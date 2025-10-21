/* eslint-disable no-throw-literal */
// import model for acces database
const userModels = require('../Models/userModel')
// import jwt for make token
const jwt = require('jsonwebtoken')
// import bcrypt for compare password from user with database
const bcrypt = require('bcrypt')
// import joi untuk validasi
const Joi = require('joi')
const { users } = require('../Sequelize/models')
const cloudinary = require('../Utils/cloudinary')
const transporter = require('../Utils/smtp')
const { fcm, firestore } = require('../Utils/firebase')

const userControllers = {
  _userRegister: async (req, res) => {
    try {
      // generate uuid user
      const { v4: uuidv4 } = require('uuid')
      const userUuid = uuidv4()

      // default role
      const role = 'user'

      // default photo profile
      const photoProfile =
        'https://res.cloudinary.com/dwptyupfa/image/upload/v1702351028/default/qypd8uufip0no3st2ukx.jpg'

      const { firstName, lastName, email, password, device_id } = req.body

      const schema = Joi.object({
        firstName: Joi.string().min(1).max(20).required(),
        lastName: Joi.string().min(1).max(20).required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        device_id: Joi.string().allow('').allow(null)
      })

      await schema.validateAsync(req.body)

      const checkEmail = await userModels.modelCheckEmail(email)

      if (checkEmail.length > 0) {
        throw { type: 'hasdata', message: 'email already registered' }
      }

      const request = await userModels.modelUserRegister({
        firstName,
        lastName,
        role,
        email,
        userUuid,
        password,
        photoProfile
      })

      const token = jwt.sign(
        {
          user_uid: userUuid,
          role: 'verify'
        },
        process.env.APP_SECRET_TOKEN,
        { expiresIn: 10 * 60 }
      )

      await transporter.sendMail({
        from: `"Orenji / Mama Recipe" <${process.env['SMTP_EMAIL']}>`,
        to: email,
        subject: 'Email Verification',
        html: `<h1>Registration success</h1>  
              <hr/>
              <p> Please <a href="${process.env.APP_URL}/verify?token=${token}">Verify Email</a></p>
              <p> Verification valid for 10 Minute, after this please resend email verification</p>
              <p> if link is can not be open, please copy pase verification link below</p>
              <p> ${process.env.APP_URL}/verify?token=${token}</p>
              <hr/>
              <p>If it's not you, please ignore this message or send request data removal to this email</p>
              `
      })

      if (device_id) {
        await firestore
          .collection('devices')
          .add({ user_uid: userUuid, device_id })

        await fcm.send({
          notification: {
            title: 'Register Success',
            body: 'Please check your email'
          },
          token: device_id
        })
      }

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
        error.message.includes('length must be less than or equal')
      ) {
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
        throw {
          type: 'nodata',
          message: 'email not found, please register first'
        }
      }

      const verificationCheck = await users.findAll({
        where: {
          verified: true,
          email
        }
      })

      if (verificationCheck.length === 0) {
        throw {
          message: 'Please verify email first, or resend email vertification'
        }
      }

      const isPassMatch = bcrypt.compareSync(password, checkMail[0].password)

      if (!isPassMatch) {
        throw { message: 'wrong password' }
      }

      // console.log(`Uid is : ${checkMail[0].user_uid}`)

      const data = {
        user_uid: checkMail[0].user_uid,
        first_name: checkMail[0].first_name,
        last_name: checkMail[0].last_name,
        photo_profile: checkMail[0].photo_profile
      }
      const token = jwt.sign(data, process.env.APP_SECRET_TOKEN)
      res.status(200).json({
        status: true,
        message: 'Login Success',
        data,
        token
      })
    } catch (error) {
      if (error.type === 'nodata') {
        res.status(404).json({
          status: false,
          massage: 'User Not Found'
        })
      } else if (error.message.includes('Please verify email first')) {
        res.status(401).json({
          status: false,
          message: error.message
        })
      } else if (error.message === 'wrong password') {
        res.status(401).json({
          status: false,
          message: 'Wrong Password'
        })
      } else if (
        error.message.includes('is not allowed to be empty') ||
        error.message.includes('must be a valid email')
      ) {
        res.status(422).json({
          status: false,
          message: error.message
        })
      } else {
        // console.log(error)
        res.status(500).json({
          status: false,
          message: 'Internal App Error'
        })
      }
    }
  },
  _userProfile: async (req, res) => {
    try {
      const { user_uid } = req.locals.user

      const detail = await users.findOne({ where: { user_uid } })
      const { first_name, last_name, phone_number, email, photo_profile } =
        detail

      res.status(200).send({
        status: 200,
        message: 'ok',
        data: {
          first_name,
          last_name,
          phone_number,
          email,
          photo_profile,
          user_uid
        }
      })
    } catch (error) {
      // console.log(error)
      res.status(500).send({
        ststus: 500,
        message: 'internal application error'
      })
    }
  },
  _editProfile: async (req, res) => {
    try {
      const schema = Joi.object({
        first_name: Joi.string().required(),
        last_name: Joi.string().required(),
        phone_number: Joi.number().allow('')
      })

      await schema.validateAsync(req.body)

      const { first_name, last_name, phone_number } = req.body
      const { user_uid } = req.locals.user

      let updateObj = { first_name, last_name }

      if (phone_number && phone_number !== null && phone_number !== '') {
        updateObj = { ...updateObj, phone_number }
      }

      await users.update(
        { ...updateObj },
        {
          where: {
            user_uid
          }
        }
      )

      res.status(200).json({
        status: 200,
        message: 'profile updated'
      })
    } catch (error) {
      // console.log(error)
      if (
        error.message.includes('must be a number') ||
        error.message.includes('is not allowed to be empty') ||
        error.message.includes('must be a valid email') ||
        error.message.includes('is required') ||
        error.message.includes('must be a string')
      ) {
        res.status(422).json({
          status: 422,
          message: String(error.message).replaceAll('"', "'")
        })
      } else {
        res.status(500).json({
          status: 500,
          message: 'internal application error'
        })
      }
    }
  },
  _changePassword: async (req, res) => {
    try {
      const schema = Joi.object({
        password: Joi.string().min(8).max(30).required()
      })

      await schema.validateAsync(req.body)

      const { password } = req.body
      const { user_uid } = req.locals.user

      const saltRounds = 3
      const salt = bcrypt.genSaltSync(saltRounds)
      const hash = bcrypt.hashSync(password, salt)

      await users.update(
        { password: hash },
        {
          where: {
            user_uid
          }
        }
      )

      res.status(200).json({
        status: 200,
        message: 'password changed'
      })
    } catch (error) {
      // console.log(error)
      if (
        error.message.includes('is not allowed to be empty') ||
        error.message.includes('is required') ||
        error.message.includes('must be a string') ||
        error.message.includes('length must be at least') ||
        error.message.includes('length must be less than or equal to')
      ) {
        res.status(422).json({
          status: 422,
          message: String(error.message).replaceAll('"', "'")
        })
      } else {
        res.status(500).json({
          status: 500,
          message: 'internal application error'
        })
      }
    }
  },
  _changePhoto: async (req, res) => {
    try {
      const { user_uid } = req.locals.user
      cloudinary.uploader
        .upload_stream({ folder: 'profile' }, async (error, result) => {
          if (result) {
            await users.update(
              { photo_profile: result.secure_url },
              { where: { user_uid } }
            )
            res.status(200).json({
              status: 200,
              message: 'photo changed'
            })
          } else if (error) {
            res.status(error.http_code).json({
              status: error.http_code,
              message: error.message
            })
          } else {
            throw { status: 500 }
          }
        })
        .end(req?.file?.buffer)
    } catch (error) {
      // console.log(error)
      res.status(500).json({
        status: 500,
        message: 'internal application error'
      })
    }
  },
  _changeEmail: async (req, res) => {
    try {
      const schema = Joi.object({
        email: Joi.string().required()
      })

      await schema.validateAsync(req.body, { abortEarly: false })
      const { email } = req.body
      const { user_uid } = req.locals.user
      let updateObj = { email: String(email) }
      const [rowsAffected, [updatedUser]] = await users.update(updateObj, {
        where: {
          user_uid
        },
        returning: true
      })

      if (rowsAffected > 0) {
        res.status(200).json({
          status: 200,
          message: 'email updated',
          email: email
        })
      } else {
        res.status(404).json({
          status: 404,
          message: 'User not found'
        })
      }
    } catch (error) {
      console.log(error)
      res.status(400).json({ error: error.message || 'Bad request' })
    }
  },
  _verifyEmail: async (req, res) => {
    try {
      const { user_uid } = req.locals.user

      const checkVertification = await users.findAll({
        where: { user_uid, verified: false }
      })

      const getDeviceId = await firestore
        .collection('devices')
        .where('user_uid', '==', user_uid)
        .get()

      const extractDeviceId = getDeviceId.docs.map((doc) => doc.data())

      if (!(extractDeviceId.length === 0)) {
        await fcm.send({
          notification: {
            title: 'Email Verified',
            body: 'Thankyou, Have a nice day!'
          },
          token: extractDeviceId[0].device_id
        })
      }

      if (checkVertification.length === 0) {
        res.status(403).send('Link is invalid, or you have been verified')
        return
      }

      await users.update(
        { verified: true },
        {
          where: {
            user_uid
          }
        }
      )

      res
        .status(200)
        .send('Email Verified Successfuly. You can close this tab.')
    } catch (error) {
      console.log(error)
      res.status(500).json({
        status: 500,
        message: 'internal application error'
      })
    }
  },
  _changePasswordNew: async (req, res) => {
    try {
      const schema = Joi.object({
        old_password: Joi.string().min(1).max(30).required(),
        password: Joi.string().min(8).max(30).required()
      })

      await schema.validateAsync(req.body)

      const { password, old_password } = req.body
      const { user_uid } = req.locals.user

      const getPassword = await users.findOne({
        attributes: ['password'],
        where: { user_uid }
      })

      const isPassMatch = bcrypt.compareSync(
        old_password,
        getPassword.dataValues.password
      )

      if (!isPassMatch) {
        throw { status: 401, message: 'wrong password' }
      }

      const saltRounds = 3
      const salt = bcrypt.genSaltSync(saltRounds)
      const hash = bcrypt.hashSync(password, salt)

      await users.update(
        { password: hash },
        {
          where: {
            user_uid
          }
        }
      )

      res.status(200).json({
        status: 200,
        message: 'password changed'
      })
    } catch (error) {
      // console.log(error)
      if (error.status === 401) {
        res.status(401).json({
          status: 401,
          message: error.message
        })
      } else if (
        error.message.includes('is not allowed to be empty') ||
        error.message.includes('is required') ||
        error.message.includes('must be a string') ||
        error.message.includes('length must be at least') ||
        error.message.includes('length must be less than or equal to')
      ) {
        res.status(422).json({
          status: 422,
          message: String(error.message).replaceAll('"', "'")
        })
      } else {
        res.status(500).json({
          status: 500,
          message: 'internal application error'
        })
      }
    }
  }
}

module.exports = userControllers
