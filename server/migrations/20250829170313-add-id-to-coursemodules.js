"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("CourseModules", "id", {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    });

    await queryInterface.addConstraint("CourseModules", {
      fields: ["CourseId", "ModuleId"],
      type: "unique",
      name: "unique_course_module",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint("CourseModules", "unique_course_module");
    await queryInterface.removeColumn("CourseModules", "id");
  },
};
