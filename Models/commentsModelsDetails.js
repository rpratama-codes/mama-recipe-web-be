const database = require('../Utils/database')

const commentsModelsDetails = {
  getAllComment: async () => {
    const request = await database`SELECT * FROM comments`
    return request
  },

  addComment: async (payload) => {
    const { recipeUid, userUid, message } = payload

    const request = await database`INSERT INTO comments (recipe_uid, user_uid, message)
                                   VALUES (${recipeUid}, ${userUid},${message});`
    return request
  },

  getCommentByUID: async (recipeUid) => {
    const request = await database`SELECT recipe_uid,user_uid,message FROM comments WHERE recipe_uid = ${recipeUid}`
    return request
  }
}

module.exports = commentsModelsDetails
