const commentsModelsDetail = require('../Models/commentsModelsDetails')

const commentsControllersDetails = {

  _getAllComments: async (req, res) => {
    try {
      const request = await commentsModelsDetail.getAllComment()
      res.status(200).json({
        status: 200,
        message: 'ok',
        data: request
      })
    } catch (error) {
      res.status(404).json({
        status: false,
        message: 'failed',
        data: ['No comment found']
      })
    }
  },

  _getCommentByUID: async (req, res) => {
    try {
      const { recipeUid } = req.params
      const request = await commentsModelsDetail.getCommentByUID(recipeUid)
      res.status(200).json({
        status: 200,
        message: 'ok',
        data: request
      })
    } catch (error) {
      res.status(404).json({
        status: false,
        message: 'failed',
        data: ['No comment found']
      })
    }
  }
}

module.exports = commentsControllersDetails
