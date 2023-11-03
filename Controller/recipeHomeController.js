const recipeModelHome = require('../Models/recipeHomeModel')

const recipeHomeController = {
  getPopulareRecipe_Controller: async (req, res) => {
    try {
      const { y } = req.params
      const request = await recipeModelHome.getPopularRecipe(y)
      res.json({
        status: 200,
        message: 'ok',
        data: request
      })
    } catch (error) {
      console.log(error)
    }
  },
  getListRecipe_Controller: async (req, res) => {
    try {
      const request = await recipeModelHome.getListRecipe()
      res.json({
        status: 200,
        message: 'ok',
        data: request
      })
    } catch (error) {
      // res.json({
      //   status: 'error',
      //   message: `Error : ${error}`,
      //   data: []
      // })
      console.log(error)
    }
  }
}

module.exports = recipeHomeController
