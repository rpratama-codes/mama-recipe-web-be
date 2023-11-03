const express = require('express')
const router = express.Router()
const receipesController = require('../Controller/receipesController')
const receipeHomeController = require('../Controller/recipeHomeController')
//
router.get('/', (req, res) => {
  return res.status(200).json({
    success: true,
    message: 'OK',
    data: []
  })
})

router.get('/recipes', receipesController._getAllReceipes)
router.get('/recipes/:receiptUid', receipesController._getRecipesByParams)

router.get('/recipes/popular/:y', receipeHomeController.getPopulareRecipe_Controller)
router.get('/recipes/popular', receipeHomeController.getListRecipe_Controller)
module.exports = router
