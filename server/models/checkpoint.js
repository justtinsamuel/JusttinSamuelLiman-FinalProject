"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Checkpoint extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Checkpoint.belongsTo(models.Course, { foreignKey: `CourseId` });
      Checkpoint.belongsToMany(models.User, {
        through: models.Submission,
        foreignKey: `CheckpointId`,
        otherKey: `UserId`,
      });
      
    }
  }
  Checkpoint.init(
    {
      title: DataTypes.STRING,
      type: DataTypes.STRING,
      max_score: DataTypes.DECIMAL,
      submission_type: DataTypes.STRING,
      is_deleted: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Checkpoint",
      timestamps: true,
    }
  );
  return Checkpoint;
};
