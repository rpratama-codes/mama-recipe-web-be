const receipesModelsDetails = require('../Models/receipesModelDetails')

const receipesControllerDetails = {

  _getAllReceipes: async (req, res) => {
    try {
      const request = await receipesModelsDetails.getAllReceipes() // merequest get all receipes dari model
      res.status(200).json({
        status: true,
        massage: 'get data succes',
        data: request
      })
    } catch (error) {
      res.status(502).json({
        status: false,
        massage: 'Somethin Wrong in Server'
      })
    }
  },

  _getRecipesByParams: async (req, res) => {
    try {
      const { receiptUid } = req.params
      const request = await receipesModelsDetails.getRecipesByParams(receiptUid)
      res.status(200).json({
        status: 200,
        message: 'ok',
        data: request
      })
    } catch (error) {
      res.status(502).json({
        status: false,
        massage: 'Somethin Wrong in Server'
      })
    }
  },

  _getRecipesByTitle: async (req, res) => {
    try {
      const { title } = req.body

      const request = await receipesModelsDetails.getRecipesByTitle(title)
      res.status(200).json({
        status: 200,
        message: 'ok',
        data: request
      })
    } catch (error) {
      res.status(400).json({
        status: false,
        massage: 'Somethin Wrong in Serverss'
      })
    }
  }

}

module.exports = receipesControllerDetails
