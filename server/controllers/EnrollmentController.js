const { Enrollment, User, Course } = require("../models");

class EnrollmentController {
  static async getEnrollments(req, res, next) {
    try {
      const enrollments = await Enrollment.findAll({
        attributes: [
          "id",
          "UserId",
          "CourseId",
          "status",
          "progress",
          "enrolled_at",
        ],
        include: [
          { model: User, attributes: ["id", "name", "email"] },
          { model: Course, attributes: ["id", "title"] },
        ],
      });

      res.json(enrollments);
    } catch (err) {
      next(err);
    }
  }

  static async getEnrollmentByUser(req, res, next) {
    try {
      const { UserId } = req.params;
      const enrollments = await Enrollment.findAll({
        where: { UserId },
        include: [{ model: Course, attributes: ["id", "title"] }],
      });
      res.json(enrollments);
    } catch (err) {
      next(err);
    }
  }

  static async createEnrollment(req, res, next) {
    try {
      const { UserId, CourseId } = req.body;
      if (!UserId || !CourseId) {
        return res
          .status(400)
          .json({ message: "UserId and CourseId are required" });
      }

      let newEnrollment = await Enrollment.create({
        UserId,
        CourseId,
        enrolled_at: new Date(),
        status: "active",
        progress: 0,
      });

      // isi ulang biar ada 'id'
      await newEnrollment.reload();

      const result = await Enrollment.findByPk(newEnrollment.id, {
        include: [
          { model: User, attributes: ["id", "name", "email"] },
          { model: Course, attributes: ["id", "title"] },
        ],
      });

      res.status(201).json(result);
    } catch (err) {
      next(err);
    }
  }

  static async updateEnrollment(req, res, next) {
    try {
      const { id } = req.params;
      const { progress, status } = req.body;

      const [updated] = await Enrollment.update(
        { progress, status, last_accessed_at: new Date() },
        { where: { id }, returning: true }
      );

      if (!updated) {
        return res.status(404).json({ message: "Enrollment not found" });
      }

      res.json({ message: "Enrollment updated" });
    } catch (err) {
      next(err);
    }
  }

  static async deleteEnrollment(req, res, next) {
    try {
      const { id } = req.params;
      const deleted = await Enrollment.destroy({ where: { id } });

      if (!deleted) {
        return res.status(404).json({ message: "Enrollment not found" });
      }

      res.json({ message: "Unenrolled successfully" });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = EnrollmentController;
