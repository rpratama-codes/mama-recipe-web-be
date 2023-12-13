'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class recipe_likes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  recipe_likes.init(
    {
      recipes_uid: DataTypes.UUID,
      user_uid: DataTypes.UUID
    },
    {
      sequelize,
      modelName: 'recipe_likes'
    }
  )
  return recipe_likes
}
