'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class recipe_statistics extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  recipe_statistics.init(
    {
      recipes_uid: DataTypes.UUID,
      views: DataTypes.FLOAT,
      likes: DataTypes.FLOAT,
      bookmarked: DataTypes.FLOAT
    },
    {
      sequelize,
      modelName: 'recipe_statistics'
    }
  )
  return recipe_statistics
}
