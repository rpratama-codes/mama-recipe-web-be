const jwt = require('jsonwebtoken')

const Auth = {
  verify: async (req, res, next) => {
    try {
      const token = req.headers.authorization.slice(7)

      const decoded = jwt.verify(token, process.env.APP_SECRET_TOKEN)

      if (decoded) {
        req.locals = { user: decoded }
        next()
      } else {
        throw { success: false, status: 401, message: 'unauthorize' }
      }
    } catch (error) {
      if (error.status === 401) {
        res.status(401).json({
          success: 401,
          message: error.message
        })
      } else {
        res.status(500).json({
          success: 500,
          message: error.message
        })
      }
    }
  }
}

module.exports = Auth
