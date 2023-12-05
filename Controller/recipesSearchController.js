const { Op } = require('sequelize')
const { recipes } = require('../Sequelize/models')
const Joi = require('joi')

class recipesNewController {
  static async _search(req, res) {
    try {
      const { title } = req.query

      const schema = Joi.string()
      await schema.validateAsync(title)

      const search = await recipes.findAll({
        where: {
          title: {
            [Op.iLike]: `%${title}%`
          }
        }
      })

      if (search.length === 0) {
        throw { status: 404, message: 'No Recipe Found' }
      }

      res.status(200).json({
        status: 200,
        message: 'ok',
        data: {
          search
        }
      })
    } catch (error) {
      if (error.status === 404) {
        res.status(404).json({
          status: 404,
          message: error.message
        })
      } else {
        res.status(500).json({
          status: 500,
          message: 'internal application error'
        })
      }
    }
  }
}

module.exports = recipesNewController
