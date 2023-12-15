const {
  recipe_bookmarks,
  recipe_likes,
  recipe_statistics
} = require('../Sequelize/models')
const sql = require('../Utils/database')

class RecipePrivateController {
  static async _getMyBookmark(req, res) {
    try {
      const { user_uid } = req.locals.user

      const data =
        await sql`select r.title, r.image , r.video_url, r.recipes_uid, r.ingredients , r.sort_desc , r.category 
        from recipe_bookmarks rb  left join recipes r on rb.recipes_uid = r.recipes_uid where rb.user_uid =${user_uid};`

      if (data.length === 0) {
        throw {
          status: 404,
          message: "Sorry you haven't saved any recipes"
        }
      }

      res.status(200).json({
        status: 200,
        message: 'ok',
        data
      })
    } catch (error) {
      console.log(error)
      if (error.status === 404) {
        res.status(404).json({
          status: 404,
          message: error.message
        })
      } else {
        res.status(500).json({
          status: 500,
          message: 'internal app error'
        })
      }
    }
  }

  static async _bookmark(req, res) {
    try {
      const { recipes_uid } = req.body
      const { user_uid } = req.locals.user

      const addBookmark = await recipe_bookmarks.findOrCreate({
        where: { recipes_uid, user_uid },
        defaults: { recipes_uid, user_uid }
      })

      await recipe_statistics.findOrCreate({
        where: { recipes_uid },
        defaults: { recipes_uid }
      })

      await recipe_statistics.increment('bookmarked', {
        where: { recipes_uid }
      })

      // console.log(addBookmark)
      res.status(200).json({
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

  static async _unbookmark(req, res) {
    try {
      const { recipes_uid } = req.body
      const { user_uid } = req.locals.user

      const deleteBookmark = await recipe_bookmarks.destroy({
        where: { recipes_uid, user_uid }
      })

      console.log(deleteBookmark)
      res.status(200).json({
        status: 200,
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

  static async _getMyLikes(req, res) {
    try {
      const { user_uid } = req.locals.user

      const data =
        await sql`select r.title, r.image , r.video_url, r.recipes_uid, r.ingredients , r.sort_desc , r.category 
        from recipe_likes rl  left join recipes r on rl.recipes_uid = r.recipes_uid where rl.user_uid =${user_uid};`

      if (data.length === 0) {
        throw {
          status: 404,
          message: "Sorry you haven't like any recipes"
        }
      }

      res.status(200).json({
        status: 200,
        message: 'ok',
        data
      })
    } catch (error) {
      console.log(error)
      if (error.status === 404) {
        res.status(404).json({
          status: 404,
          message: error.message
        })
      } else {
        res.status(500).json({
          status: 500,
          message: 'internal app error'
        })
      }
    }
  }

  static async _likeRecipe(req, res) {
    try {
      const { recipes_uid } = req.body
      const { user_uid } = req.locals.user

      const addLike = await recipe_likes.findOrCreate({
        where: { recipes_uid, user_uid },
        defaults: { recipes_uid, user_uid }
      })

      await recipe_statistics.findOrCreate({
        where: { recipes_uid },
        defaults: { recipes_uid }
      })

      await recipe_statistics.increment('likes', {
        where: { recipes_uid }
      })

      // console.log(addBookmark)
      res.status(200).json({
        status: 200,
        message: 'liked'
      })
    } catch (error) {
      console.log(error)
      res.status(500).json({
        status: 500,
        message: 'internal application error'
      })
    }
  }

  static async _dislikeRecipe(req, res) {
    try {
      const { recipes_uid } = req.body
      const { user_uid } = req.locals.user

      const deleteLike = await recipe_likes.destroy({
        where: { recipes_uid, user_uid }
      })

      console.log(deleteLike)
      res.status(200).json({
        status: 200,
        message: 'disliked'
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
