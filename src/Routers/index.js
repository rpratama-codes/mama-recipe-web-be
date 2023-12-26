const express = require('express')
const router = express.Router()

const multer = require('multer')
const storage = multer.memoryStorage()
const upload = multer({ storage })

// controller
const receipeHomeController = require('../Controller/recipeHomeController')
const receipesControllerDetails = require('../Controller/receipesControllerDetails')
const commentsControllerDetails = require('../Controller/commentsControllerDetails')
const userControllers = require('../Controller/userController')
const recipesNewController = require('../Controller/recipesNewController')
const RecipePrivateController = require('../Controller/recipePrivateController')

// midleware
const Auth = require('../Middleware/Auth')

router.get('/', (req, res) => {
  return res.status(200).json({
    success: true,
    message: 'api running well'
  })
})

router.get(
  '/recipes/getmybookmark',
  Auth.verify,
  RecipePrivateController._getMyBookmark
)

router.post('/recipes/bookmark', Auth.verify, RecipePrivateController._bookmark)

router.delete(
  '/recipes/unbookmark',
  Auth.verify,
  RecipePrivateController._unbookmark
)

router.get(
  '/recipes/getmylikes',
  Auth.verify,
  RecipePrivateController._getMyLikes
)

router.post('/recipes/like', Auth.verify, RecipePrivateController._likeRecipe)

router.delete(
  '/recipes/dislike',
  Auth.verify,
  RecipePrivateController._dislikeRecipe
)

router.get(
  '/recipes/getmyrecipe',
  Auth.verify,
  RecipePrivateController._getMyRecipes
)

router.delete('/recipes/delete', Auth.verify, recipesNewController._delete)
router.get('/recipes/search', recipesNewController._search)

router.post(
  '/recipes/add',
  Auth.verify,
  upload.single('recipe-image'),
  recipesNewController._add
)
router.get('/recipes/allRecipes', receipesControllerDetails._getAllReceipes)
router.get(
  '/recipes/:receiptUid',
  receipesControllerDetails._getRecipesByParams
)

// comment endpoint
router.get('/comments', commentsControllerDetails._getAllComments)
router.post('/comments', Auth.verify, commentsControllerDetails._addComment)
router.post('/recipes/detail', receipesControllerDetails._getRecipesByTitle)
router.get(
  '/recipes/:recipeUid/detail/comments',
  commentsControllerDetails._getCommentByUID
)

// recipe Popular endpoint
router.get('/home/popular', receipeHomeController.getPopulareRecipe_Controller)
router.get('/home/list', receipeHomeController.getListRecipe_Controller)
router.get('/home/new', receipeHomeController.getNewRecipe_Controller)

// user endpoint
router.post('/user/register', userControllers._userRegister)
router.post('/user/login', userControllers._userLogin)
router.get('/user/profile', Auth.verify, userControllers._userProfile)
// router.post(
//   '/user/profile/edit-email',
//   Auth.verify,
//   userControllers._changeEmail
// )
router.post(
  '/user/profile/edit-email',
  Auth.verify,
  userControllers._changeEmail,
  (err, req, res, next) => {
    // Pengelola kesalahan untuk _changeEmail
    console.error(err)
    res.status(500).json({
      status: 500,
      message: 'Internal Server Error'
    })
  }
)

router.put('/user/profile/edit', Auth.verify, userControllers._editProfile)
router.put(
  '/user/profile/update-password',
  Auth.verify,
  userControllers._changePassword
)
router.put(
  '/user/profile/update-password-new',
  Auth.verify,
  userControllers._changePasswordNew
)
router.post(
  '/user/profile/update-photo',
  Auth.verify,
  upload.single('user-photo'),
  userControllers._changePhoto
)
router.get('/verify', Auth.verifyEmail, userControllers._verifyEmail)

module.exports = router
