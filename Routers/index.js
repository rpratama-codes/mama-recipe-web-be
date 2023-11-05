const express = require('express')
const router = express.Router()

// controller
const receipeHomeController = require('../Controller/recipeHomeController')
const receipesControllerDetails = require('../Controller/receipesControllerDetails')
const commentsControllerDetails = require('../Controller/commentsControllerDetails')
const userControllers = require('../Controller/userController')

// midleware
const checkJwt = require('../Middleware/checkJWT')
const userUid = require('../Middleware/userUID')
//
router.get('/', (req, res) => {
  return res.status(200).json({
    success: true,
    message: 'OK',
    data: []
  })
})
// receipes endpoint
router.get('/recipes/allRecipes', receipesControllerDetails._getAllReceipes)
router.get('/recipes/:receiptUid', receipesControllerDetails._getRecipesByParams)

// comment endpoint
router.get('/comments', commentsControllerDetails._getAllComments)
router.post('/comments', commentsControllerDetails._addComment)
router.post('/recipes/detail', receipesControllerDetails._getRecipesByTitle)
router.get('/recipes/:recipeUid/detail/comments', commentsControllerDetails._getCommentByUID)

// recipe Popular endpoint
router.get('/home/popular', receipeHomeController.getPopulareRecipe_Controller)
router.get('/home/list', receipeHomeController.getListRecipe_Controller)
router.get('/home/new', receipeHomeController.getNewRecipe_Controller)

// user endpoint
router.post('/user/register', userControllers._userRegister)
router.post('/user/login', userControllers._userLogin)
router.post('/user/login/profile', checkJwt.jwtTokenDecode, userControllers._userLoginProfile)

//
router.get('/user/uuid', userUid.usserUid)

module.exports = router
