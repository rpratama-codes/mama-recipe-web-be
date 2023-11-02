const database = require('../Utils/database')

const commentsModelsDetails = {
  getAllComment: async () => {
    const request = await database`SELECT * FROM comments`
    return request
  },

  getCommentByUID: async (recipeUid) => {
    const request = await database`SELECT recipe_uid,user_uid,message FROM comments WHERE recipe_uid = ${recipeUid}`
    return request
  }
}

module.exports = commentsModelsDetails
