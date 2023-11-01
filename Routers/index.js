const router = require('express').Router()

//
router.get('/', (req, res) => {
  return res.status(200).json({
    success: true,
    message: 'OK',
    data: []
  })
})

module.exports = router
