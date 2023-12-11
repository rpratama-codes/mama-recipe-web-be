const jwt = require('jsonwebtoken')

class Auth {
  static async verify(req, res, next) {
    try {
      const token = req?.headers?.authorization?.slice(7)
      const decoded = jwt.verify(token, process.env.APP_SECRET_TOKEN)

      if (decoded?.role === 'verify') {
        throw { status: 403, message: 'forbidden' }
      } else if (decoded) {
        req.locals = { user: decoded }
        next()
      } else {
        throw { success: false, status: 401, message: 'unauthorize' }
      }
    } catch (error) {
      let customMessage = ''
      customMessage += 'please not directy consume this message to the client, '
      customMessage += "you're try to access the endpoint that need a login, "
      customMessage += 'or you has not correctly attach the auth headers.'

      if (error.status === 403) {
        res.status(403).json({
          status: 403,
          message: error.message
        })
      } else if (
        error.status === 401 ||
        error.message.includes('must be provided')
      ) {
        res.status(401).json({
          status: 401,
          message: customMessage
        })
      } else {
        res.status(500).json({
          status: 500,
          message: error.message
        })
      }
    }
  }

  static async verifyEmail(req, res, next) {
    try {
      let { token } = req.query

      if (!token) {
        throw { status: 403, message: 'forbidden' }
      }

      const decoded = jwt.verify(token, process.env.APP_SECRET_TOKEN)

      if (decoded?.role === 'verify') {
        req.locals = { user: decoded }
        next()
      } else {
        throw { success: false, status: 403, message: 'forbidden' }
      }
    } catch (error) {
      console.log(error)
      if (error.message.includes('jwt expired')) {
        res.status(403).send('Token Expired, Please Resend Email Verification')
      } else if (error.status === 403) {
        res.status(403).json({
          status: 403,
          message: error.message
        })
      } else {
        res.status(500).json({
          status: 500,
          message: error.message
        })
      }
    }
  }
}

module.exports = Auth
