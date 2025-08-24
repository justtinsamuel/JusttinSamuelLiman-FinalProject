const { User } = require("../models");

class UserController {
  static async getUsers(req, res, next) {
    try {
      const result = await User.findAll({
        where: { is_deleted: false },
      });
      res.json(result);
    } catch (err) {
      next(err); // lempar error ke middleware
    }
  }

  static async getUserById(req, res, next) {
    try {
      const { id } = req.params;
      const result = await User.findOne({
        where: { id, is_deleted: false },
      });
      if (!result) return res.status(404).json({ message: "Data not found" });

      res.json(result);
    } catch (err) {
      next(err);
    }
  }

  static async createUser(req, res, next) {
    try {
      const { name, email, password, role } = req.body;
      const newUser = await User.create({
        name,
        email,
        password,
        role,
      });
      res.status(201).json({
        message: "User created successfully",
        user: newUser,
      });
    } catch (err) {
      next(err);
    }
  }

  static async updateUser(req, res, next) {
    try {
      const { id } = req.params;
      const { name, email, role } = req.body;
      const result = await User.findOne({ where: { id, is_deleted: false } });
      if (!result) return res.status(404).json({ message: "Data not found" });

      await result.update({ name, email, role });

      const userSafe = {
        id: result.id,
        name: result.name,
        email: result.email,
        role: result.role,
      };

      res.json({ message: "User updated successfully", user: userSafe });
    } catch (err) {
      next(err);
    }
  }

  static async deleteUser(req, res, next) {
    try {
      const { id } = req.params;
      const result = await User.findOne({
        where: { id, is_deleted: false },
      });
      if (!result) return res.status(404).json({ message: "Data not found" });

      await result.update({ is_deleted: true });
      res.json({ message: "Data successfully deleted" });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = UserController;
