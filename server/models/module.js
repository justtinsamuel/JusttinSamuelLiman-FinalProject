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
      // define association here

      Module.hasMany(models.CourseModule, { foreignKey: "ModuleId" });
      Module.belongsToMany(models.Course, {
        through: models.CourseModule,
        foreignKey: "ModuleId",
        otherKey: "CourseId",
      });
    }
  }
  Module.init(
    {
      title: DataTypes.STRING,
      content: DataTypes.TEXT,
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
