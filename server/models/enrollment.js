"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Enrollment extends Model {
    static associate(models) {
      Enrollment.belongsTo(models.User, { foreignKey: "UserId" });
      Enrollment.belongsTo(models.Course, { foreignKey: "CourseId" });
    }
  }

  Enrollment.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      enrolled_at: DataTypes.DATE,
      last_accessed_at: DataTypes.DATE,
      progress: DataTypes.DECIMAL,
      status: DataTypes.STRING,
      UserId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
      },
      CourseId: {
        type: DataTypes.INTEGER,
        references: {
          model: "Courses",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "Enrollment",
      timestamps: true,
    }
  );

  return Enrollment;
};
  