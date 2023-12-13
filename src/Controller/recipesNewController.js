const { Op } = require('sequelize')
const { recipes } = require('../Sequelize/models')
const Joi = require('joi')
const { v4: uuidv4 } = require('uuid')
const cloudinary = require('../Utils/cloudinary')

class recipesNewController {
  static async _search(req, res) {
    try {
      let { title, amount, page, sortBy, sort, byMe, user_uid, category } =
        req.query

      const schema = Joi.object({
        title: Joi.string().allow(null).allow(''),
        amount: Joi.number().min(1).max(10),
        page: Joi.number().min(1).max(10),
        sortBy: Joi.string().valid('title', 'latest'),
        sort: Joi.string().valid('asc', 'desc'),
        byMe: Joi.string().valid('true', 'false'),
        user_uid: Joi.string().guid({ version: 'uuidv4', separator: '-' }),
        category: Joi.string().disallow('null').disallow('')
      })

      await schema.validateAsync(req.query)

      const limit = !amount ? 6 : amount
      const offset = !page ? 0 : limit * (page - 1)
      sortBy = !sortBy ? 'title' : sortBy
      sort = !sort ? 'asc' : sort
      title = !title ? '%' : title

      let where = {
        title: {
          [Op.iLike]: `%${title}%`
        }
      }

      if (Boolean(byMe) === true && category) {
        where = {
          [Op.and]: [
            {
              title: {
                [Op.iLike]: `%${title}%`
              }
            },
            {
              created_by: user_uid
            },
            {
              category: {
                [Op.iLike]: `%${category}%`
              }
            }
          ]
        }
      } else if (Boolean(byMe) === true) {
        where = {
          [Op.and]: [
            {
              title: {
                [Op.iLike]: `%${title}%`
              }
            },
            {
              created_by: user_uid
            }
          ]
        }
      } else if (category) {
        where = {
          [Op.and]: [
            {
              title: {
                [Op.iLike]: `%${title}%`
              }
            },
            {
              category: {
                [Op.iLike]: `%${category}%`
              }
            }
          ]
        }
      }

      const search = await recipes.findAndCountAll({
        where,
        limit,
        offset,
        order: [[sortBy, sort]]
      })

      if (search.rows.length === 0) {
        throw { status: 404, message: 'No Recipe Found' }
      }

      res.status(200).json({
        status: 200,
        message: 'ok',
        pagination: {
          page: Number(page) || 1,
          'page-data': search.rows.length,
          'page-length': Math.ceil(search.count / limit),
          'data-total': search.count
        },
        data: {
          search: search.rows
        }
      })
    } catch (error) {
      // console.log(error)
      if (
        error.message.includes('"created_by" has invalid "undefined" value')
      ) {
        res.status(400).json({
          status: 400,
          message: 'If byMe true, user_uid is required'
        })
      } else if (
        error.message.includes('must be a valid GUID') ||
        error.message.includes('is not allowed to be empty') ||
        error.message.includes('is not allowed') ||
        error.message.includes('must be one of') ||
        error.message.includes('must be greater than or equal to') ||
        error.message.includes('must be less than or equal to')
      ) {
        res.status(422).json({
          status: 422,
          message: String(error.message).replaceAll('"', "'")
        })
      } else if (error.status === 404) {
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

  static async _add(req, res) {
    try {
      const schema = Joi.object({
        title: Joi.string().min(5).max(30).required(),
        description: Joi.string().allow(null).allow(''),
        ingredients: Joi.string().allow(null).allow(''),
        steps: Joi.string().allow(null).allow(''),
        video: Joi.string().uri().allow(null).allow(''),
        category: Joi.string().allow(null).allow('')
      })

      await schema.validateAsync(req.body)

      const uuid = uuidv4()
      const { user_uid } = req.locals.user
      let { title, description, ingredients, steps, video, category } = req.body

      if (!category || category === '') {
        category = 'Uncategorized'
      }

      const ingredientsObj = {
        title,
        desc: description,
        ingridient: JSON.parse(ingredients),
        steps: JSON.parse(steps)
      }

      cloudinary.uploader
        .upload_stream({ folder: 'recipe' }, async (error, result) => {
          if (result) {
            await recipes.create({
              title,
              status: 'public',
              video_url: video,
              recipes_uid: uuid,
              ingredients: ingredientsObj,
              sort_desc: description,
              rating: 4.7,
              category,
              created_by: user_uid,
              image: result.secure_url
            })

            res.status(201).json({
              status: 201,
              message: 'recipe added'
            })
          } else if (error) {
            // console.log(error)
            res.status(error.http_code).json({
              status: error.http_code,
              message: error.message
            })
          } else {
            res.status(500).json({
              status: 500,
              message: 'internal application error'
            })
          }
        })
        .end(req?.file?.buffer)
    } catch (error) {
      console.log(error)
      if (
        error.message.includes('must be a valid uri') ||
        error.message.includes('must be a string') ||
        error.message.includes('length must be at least') ||
        error.message.includes('must be an array') ||
        error.message.includes('is not allowed') ||
        error.message.includes('length must be less than or equal to') ||
        error.message.includes('is required')
      ) {
        res.status(422).json({
          status: 422,
          message: String(error.message).replaceAll('"', "'")
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
