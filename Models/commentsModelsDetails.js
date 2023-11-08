const database = require('../Utils/database')

const commentsModelsDetails = {
  getAllComment: async () => {
    const request = await database`SELECT * FROM comments`
    return request
  },
  addComment: async (payload) => {
    const { recipeUid, userUid, message } = payload
    const request = await database`INSERT INTO comments (recipe_uid, user_uid, message) VALUES (${recipeUid}, ${userUid},${message}) returning id`
    return request
  },
  getCommentByUID: async (recipeUid) => {
    const request = await database`select
    CONCAT(u.first_name,' ',u.last_name) as name,
    message, photo_profile as photo
    from "comments" c  left join users u
    on c.user_uid = u.user_uid
    where recipe_uid = ${recipeUid}`
    return request
  }
}

module.exports = commentsModelsDetails
