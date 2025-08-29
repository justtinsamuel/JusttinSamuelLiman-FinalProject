// models/courseModule.js
"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class CourseModule extends Model {
    static associate(models) {
      CourseModule.belongsTo(models.Course, { foreignKey: "CourseId" });
      CourseModule.belongsTo(models.Module, { foreignKey: "ModuleId" });
    }
  }

  CourseModule.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      CourseId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Courses",
          key: "id",
        },
      },
      ModuleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Modules",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "CourseModule",
      tableName: "CourseModules",
      indexes: [
        {
          unique: true,
          fields: ["CourseId", "ModuleId"], // supaya tidak ada duplikat
        },
      ],
    }
  );

  return CourseModule;
};
