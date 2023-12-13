const { recipe_bookmarks } = require('../Sequelize/models')

class RecipePrivateController {
  static async _bookmarkRecipe(req, res) {
    try {
      const { recipes_uid } = req.body
      const { user_uid } = req.locals.user

      const addBookmark = await recipe_bookmarks.findOrCreate({
        where: { recipes_uid, user_uid },
        defaults: { recipes_uid, user_uid }
      })

      console.log(addBookmark)
      res.status(201).json({
        status: 200,
        message: 'bookmarked'
      })
    } catch (error) {
      console.log(error)
      res.status(500).json({
        status: 500,
        message: 'internal application error'
      })
    }
  }

  static async _bookmarkDelete(req, res) {
    try {
      const { recipes_uid } = req.body
      const { user_uid } = req.locals.user

      const deleteBookmark = await recipe_bookmarks.destroy({
        where: { recipes_uid, user_uid }
      })

      console.log(deleteBookmark)
      res.status(204).json({
        status: 204,
        message: 'bookmark deleted'
      })
    } catch (error) {
      console.log(error)
      res.status(500).json({
        status: 500,
        message: 'internal application error'
      })
    }
  }
}

module.exports = RecipePrivateController
