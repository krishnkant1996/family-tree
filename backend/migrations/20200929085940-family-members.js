'use strict';

module.exports = {
  up: async (queryInterface,Sequelize) => {
    await queryInterface.createTable('dbo_family_members',{
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
      },
      family_id: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      name: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      gender: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      status: {
        type: Sequelize.STRING(10),
        allowNull: true,
        defaultValue:"1"
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: true
      }
    })
  },

  down: async (queryInterface,Sequelize) => {
    await queryInterface.dropTable('dbo_family_members');
  }
};
