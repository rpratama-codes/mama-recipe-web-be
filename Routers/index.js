const express = require('express')
const router = express.Router()

const receipeHomeController = require('../Controller/recipeHomeController')
const receipesControllerDetails = require('../Controller/receipesControllerDetails')
const commentsControllerDetails = require('../Controller/commentsControllerDetails')
//
router.get('/', (req, res) => {
  return res.status(200).json({
    success: true,
    message: 'OK',
    data: []
  })
})
// receipes endpoint
router.get('/recipes', receipesControllerDetails._getAllReceipes)
router.get('/recipes/:receiptUid', receipesControllerDetails._getRecipesByParams)
// comment endpoint
router.get('/comments', commentsControllerDetails._getAllComments)
router.post('/comments', commentsControllerDetails._addComment)
router.get('/recipes/:recipeUid/detail/comments', commentsControllerDetails._getCommentByUID)
// recipe Popular endpoint
router.get('/home/popular', receipeHomeController.getPopulareRecipe_Controller)
router.get('/home/list', receipeHomeController.getListRecipe_Controller)
router.get('/home/new', receipeHomeController.getNewRecipe_Controller)
module.exports = router
