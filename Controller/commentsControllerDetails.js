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

  _addComment: async (req, res) => {
    try {
      const { recipeUid, userUid, message } = req.body
      const request = await commentsModelsDetail.addComment({ recipeUid, userUid, message })
      res.status(201).json({
        status: 201,
        message: 'Comment Posted',
        data: request
      })
    } catch (error) {
      res.status(401).json({
        status: false,
        message: 'failed',
        data: ['Please login first!!!'],
        pp: console.log(error)
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
