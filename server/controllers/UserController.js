const { User } = require("../models");

class UserController {
  static async getUsers(req, res) {
    try {
      const result = await User.findAll({
        where: { is_deleted: false },
      });
      res.json(result);
    } catch (err) {
      res.status(500).json({
        err: err.message,
      });
    }
  }

  static async getUserById(req, res) {
    try {
      const { id } = req.params;
      const result = await User.findOne({
        where: { id, is_deleted: false },
      });
      if (!result) return res.status(404).json({ message: `Data not found` });
      res.json(result);
    } catch (err) {
      res.status(500).json({
        err: err.message,
      });
    }
  }

  static async createUser(req, res) {
    try {
      const { name, email, password, role } = req.body;
      const newUser = await User.create({
        name,
        email,
        password,
        role,
      });
      res.status(200).json(newUser);
    } catch (err) {
      res.status(500).json({
        err: err.message,
      });
    }
  }

  static async updateUser(req, res) {
    try {
      const { id } = req.params;
      const { name, email, role } = req.body;
      const result = await User.findOne({ where: id, is_deleted: false });
      if (!result) return res.status(404).json({ message: `Data not found` });

      await result.update({
        name,
        email,
        role,
      });
      res.json(result);
    } catch (err) {
      res.status(500).json({ err: err.message });
    }
  }

  static async deleteUser(req, res) {
    try {
      const { id } = req.params;
      const result = await User.findOne({
        where: { id, is_deleted: false },
      });
      if (!result) return res.status(404).json({ message: `Data not found` });

      await result.update({ is_deleted: true });
      res.json({ message: `Data successfully deleted` });
    } catch (err) {
      res.status(500).json({
        err: err.message,
      });
    }
  }
}

module.exports = UserController;
