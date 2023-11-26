const jwt = require('jsonwebtoken')

const chekJWT = {
  jwtTokenDecode: async (req, res, next) => {
    try {
      const token = req.headers.authorization.slice(7)
      const decoded = jwt.verify(token, process.env.APP_SECRET_TOKEN)

      if (decoded) {
        next()
      } else {
        throw { success: false, message: 'unauthorize' }
      }
    } catch (error) {
      res.status(401).json({
        success: false,
        message: 'unautorize'
      })
    }
  }
}
module.exports = chekJWT
