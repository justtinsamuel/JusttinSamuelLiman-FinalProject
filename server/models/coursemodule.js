"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CourseModule extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      CourseModule.belongsTo(models.Course, { foreignKey: "CourseId" });
      CourseModule.belongsTo(models.Module, { foreignKey: "ModuleId" });
    }
  }
  CourseModule.init(
    {
      order_index: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "CourseModule",
    }
  );
  return CourseModule;
};
