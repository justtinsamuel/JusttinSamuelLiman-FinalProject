"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Enrollment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Enrollment.belongsTo(models.User, { foreignKey: "UserId" });
      Enrollment.belongsTo(models.Course, { foreignKey: "CourseId" });
    }
  }
  Enrollment.init(
    {
      enrolled_at: DataTypes.DATE,
      last_accessed_at: DataTypes.DATE,
      progress: DataTypes.DECIMAL,
      status: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Enrollment",
      timestamps: true,
    }
  );
  return Enrollment;
};
