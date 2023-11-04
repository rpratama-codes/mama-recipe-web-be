const jwt = require('jsonwebtoken')

const chekJWT = {

  jwtTokenDecode: async (req, res, next) => {
    try {
      const token = req.headers.authorization.slice(7)
      console.log(token)
      const decoded = jwt.verify(token, process.env.APP_SECRET_TOKEN)
      console.log(decoded)
      if (decoded) { // nah kalo sesuai maka kita bisa lanjut masuk ke bagian controller dengan parameter next
        next()
      }
    } catch (error) {
      res.status(304).json({
        status: false,
        message: console.log(error)
      })
    }
  }
}
module.exports = chekJWT
