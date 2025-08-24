"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Submission extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Submission.belongsTo(models.User, { foreignKey: "UserId" });
      Submission.belongsTo(models.Checkpoint, { foreignKey: "CheckpointId" });
    }
  }
  Submission.init(
    {
      submitted_at: DataTypes.DATE,
      grade: DataTypes.DECIMAL,
      feedback: DataTypes.TEXT,
      submission_link: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Submission",
      timestamps: true,
    }
  );
  return Submission;
};
