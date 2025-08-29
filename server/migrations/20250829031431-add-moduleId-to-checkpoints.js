module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Checkpoints", "moduleId", {
      type: Sequelize.INTEGER,
      references: {
        model: "Modules",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Checkpoints", "moduleId");
  },
};