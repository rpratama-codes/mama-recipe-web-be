const database = require('../Utils/database')

const recipeHomeModel = {
  getPopularRecipe: async (y) => {
    const parameters = Boolean(y)
    const request = await database`SELECT * FROM receipts WHERE ispopular= ${parameters} `
    // console.log(parameters)
    return request
  },
  getListRecipe: async () => {
    const request = await database`SELECT * FROM receipts LIMIT 6`
    return request
  }
}

module.exports = recipeHomeModel
