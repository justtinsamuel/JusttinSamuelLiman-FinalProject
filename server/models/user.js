"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcrypt");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Enrollment, { foreignKey: "UserId" });
      User.belongsToMany(models.Course, {
        through: models.Enrollment,
        foreignKey: "UserId",
        otherKey: "CourseId",
      });
      User.belongsToMany(models.Checkpoint, {
        through: models.Submission,
        foreignKey: "UserId",
        otherKey: "CheckpointId",
      });
      User.hasMany(models.Submission, { foreignKey: "UserId" });
    }

    static async comparePwd(inputPassword, hashedPassword) {
      return bcrypt.compare(inputPassword, hashedPassword);
    }
  }
  User.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      role: DataTypes.STRING,
      is_deleted: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "User",
      hooks: {
        // Hash Pwd before create
        beforeCreate: async (user) => {
          if (user.password) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
          }
        },
        // Hash Pwd sebelum update
        beforeUpdate: async (user) => {
          if (user.changed("password")) {
            const salt = await bcrypt.hash(user.password, salt);
          }
        },
      },
    }
  );
  return User;
};
