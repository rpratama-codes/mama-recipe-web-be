'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('recipe_statistics', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      recipes_uid: {
        type: Sequelize.UUID
      },
      views: {
        type: Sequelize.FLOAT,
        defaultValue: 0
      },
      likes: {
        type: Sequelize.FLOAT,
        defaultValue: 0
      },
      bookmarked: {
        type: Sequelize.FLOAT,
        defaultValue: 0
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('recipe_statistics')
  }
}
