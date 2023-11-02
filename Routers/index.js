const express = require('express')
const router = express.Router()
const receipesController = require('../Controller/receipesController')
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

module.exports = router
