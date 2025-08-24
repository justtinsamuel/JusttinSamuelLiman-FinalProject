const { Course } = require("../models");

class CourseController {
  static async getCourses(req, res, next) {
    try {
      const result = await Course.findAll({
        where: { is_deleted: false },
      });
      res.json(result);
    } catch (err) {
      next(err);
    }
  }

  static async getCourseById(req, res, next) {
    try {
      const { id } = req.params;
      const result = await Course.findOne({
        where: { id, is_deleted: false },
      });
      if (!result) return res.status(404).json({ message: "Data not found" });

      res.json(result);
    } catch (err) {
      next(err);
    }
  }

  static async createCourse(req, res, next) {
    try {
      const { title, description } = req.body;
      const newCourse = await Course.create({
        title,
        description,
      });
      res.status(201).json({
        message: "Course created successfully",
        Course: newCourse,
      });
    } catch (err) {
      next(err);
    }
  }

  static async updateCourse(req, res, next) {
    try {
      const { id } = req.params;
      const { title, description } = req.body;
      const result = await Course.findOne({ where: { id, is_deleted: false } });
      if (!result) return res.status(404).json({ message: "Data not found" });

      await result.update({ title, description });

      res.json({ message: "Course updated successfully", result });
    } catch (err) {
      next(err);
    }
  }

  static async deleteCourse(req, res, next) {
    try {
      const { id } = req.params;
      const result = await Course.findOne({
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

module.exports = CourseController;
