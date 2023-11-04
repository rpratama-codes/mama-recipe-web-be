const database = require('../Utils/database')

const recipeHomeModel = {
  getPopularRecipe: async () => {
    const request = await database`SELECT * FROM receipts WHERE ispopular='TRUE' LIMIT 1`
    console.log(`Polular Recipe dapat ${request.length}`)
    return request
  },
  getListRecipe: async () => {
    const request = await database`SELECT * FROM receipts LIMIT 6`
    console.log(`List Recipe dapat ${request.length}`)

    return request
  },
  _getNewRecipe: async () => {
    const request = await database`SELECT * FROM receipts ORDER BY created_at DESC LIMIT 1`
    console.log(`New Recipe dapat ${request.length}`)

    return request
  }
}

module.exports = recipeHomeModel
