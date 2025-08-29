const {
  Course,
  CourseModule,
  Module,
  Checkpoint,
  Enrollment,
  User,
} = require("../models");

class CourseController {
  static async getCourses(req, res, next) {
    try {
      const result = await Course.findAll({
        where: { is_deleted: false },
        include: [
          {
            model: CourseModule,
            include: [
              {
                model: Module,
              },
            ],
          },
        ],
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
        include: [
          {
            model: CourseModule,
            include: [
              {
                model: Module,
                include: [Checkpoint],
              },
            ],
          },
          {
            model: Enrollment,
            include: [User],
          },
        ],
      });

      if (!result) return res.status(404).json({ message: "Data not found" });

      res.json(result);
    } catch (err) {
      console.error(`Error`, err);
      res
        .status(500)
        .json({ message: "internal server error", error: err.message });
      // next(err);
    }
  }

  static async createCourse(req, res, next) {
    try {
      const { title, description } = req.body;
      const newCourse = await Course.create({
        title,
        description,
      });
      res.status(201).json(newCourse);
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

      res.json(result);
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
