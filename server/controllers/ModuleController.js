const { Module } = require("../models");

class ModuleController {
  static async getModules(req, res, next) {
    try {
      const result = await Module.findAll({
        where: { is_deleted: false },
      });
      res.json(result);
    } catch (err) {
      next(err);
    }
  }

  static async getModuleById(req, res, next) {
    try {
      const { id } = req.params;
      const result = await Module.findOne({
        where: { id, is_deleted: false },
      });
      if (!result) return res.status(404).json({ message: "Data not found" });

      res.json(result);
    } catch (err) {
      next(err);
    }
  }

  static async createModule(req, res, next) {
    try {
      const { title, content, contentType } = req.body;
      const newModule = await Module.create({
        title,
        content,
        contentType,
      });
      res.status(201).json({
        message: "Module created successfully",
        Module: newModule,
      });
    } catch (err) {
      next(err);
    }
  }

  static async updateModule(req, res, next) {
    try {
      const { id } = req.params;
      const { title, content, contentType } = req.body;
      const result = await Module.findOne({ where: { id, is_deleted: false } });
      if (!result) return res.status(404).json({ message: "Data not found" });

      await result.update({ title, content, contentType });

      res.json({ message: "Module updated successfully", result });
    } catch (err) {
      next(err);
    }
  }

  static async deleteModule(req, res, next) {
    try {
      const { id } = req.params;
      const result = await Module.findOne({
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

module.exports = ModuleController;
