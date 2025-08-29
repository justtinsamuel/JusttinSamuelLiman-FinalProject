"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Course extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Course.hasMany(models.Enrollment, { foreignKey: "CourseId" });

      Course.belongsToMany(models.User, {
        through: models.Enrollment,
        foreignKey: "CourseId",
        otherKey: "UserId",
      });
      Course.hasMany(models.CourseModule, { foreignKey: "CourseId" });

      // relasi many-to-many dengan Module
      Course.belongsToMany(models.Module, {
        through: models.CourseModule,
        foreignKey: "CourseId",
        otherKey: "ModuleId",
      });

      Course.hasMany(models.Checkpoint, {
        foreignKey: "CourseId",
      });
    }
  }
  Course.init(
    {
      title: DataTypes.STRING,
      description: DataTypes.TEXT,
      is_deleted: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Course",
      timestamps: true,
    }
  );
  return Course;
};
