const { CourseModule, Course, Module } = require("../models");

class CourseModuleController {
  // Add module to course
  static async add(req, res, next) {
    try {
      const { course_id, module_id } = req.body;
      if (!course_id || !module_id)
        return res
          .status(400)
          .json({ message: "course_id & module_id required" });

      const newCourseModule = await CourseModule.create({
        course_id,
        module_id,
      });

      // Optionally, include related Module data
      const result = await CourseModule.findOne({
        where: { id: newCourseModule.id },
        include: [Module],
      });

      res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  }

  // Remove module from course
  static async remove(req, res, next) {
    try {
      const { courseModuleId } = req.params;
      const courseModule = await CourseModule.findOne({
        where: { id: courseModuleId },
      });
      if (!courseModule)
        return res.status(404).json({ message: "Data not found" });

      await courseModule.destroy();
      res.status(200).json({ message: "Deleted successfully" });
    } catch (err) {
      next(err);
    }
  }

  // Optional: Get all course-modules
  static async getAll(req, res, next) {
    try {
      const result = await CourseModule.findAll({
        include: [Course, Module],
      });
      res.json(result);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = CourseModuleController;
