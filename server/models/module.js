"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Module extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // relasi many-to-many dengan Course
      Module.belongsToMany(models.Course, {
        through: models.CourseModule,
        foreignKey: "ModuleId",
        otherKey: "CourseId",
      });
      Module.hasMany(models.CourseModule, { foreignKey: "ModuleId" });
      Module.hasMany(models.Checkpoint, {
        foreignKey: "moduleId",
      });
    }
  }
  Module.init(
    {
      title: DataTypes.STRING,
      content: DataTypes.STRING,
      content_type: DataTypes.STRING,
      is_deleted: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Module",
      timestamps: true,
    }
  );
  return Module;
};
