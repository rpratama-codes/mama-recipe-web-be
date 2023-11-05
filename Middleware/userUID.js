const userUid = {
  usserUid: async (req, res, next) => {
    try {
      const { v4: uuidv4 } = require('uuid')
      const userUuid = uuidv4()
      console.log(userUuid)
    } catch (error) {
      console.log(error)
    }
  }
}
module.exports = userUid
