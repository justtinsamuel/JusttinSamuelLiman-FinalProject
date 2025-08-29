const { CourseModule, Course, Module } = require("../models");

class CourseModuleController {
  // Add module to course
  static async add(req, res, next) {
    try {
      console.log("=== [CourseModuleController.add] ===");
      console.log("Raw body from request:", req.body);

      const { CourseId, ModuleId } = req.body;
      if (!CourseId || !ModuleId) {
        console.log("❌ Missing CourseId or ModuleId");
        return res
          .status(400)
          .json({ message: "CourseId & ModuleId required" });
      }

      console.log("Creating CourseModule with:", { CourseId, ModuleId });

      const newCourseModule = await CourseModule.create({
        CourseId,
        ModuleId,
      });

      console.log("✅ CourseModule created with ID:", newCourseModule.id);

      // Optionally, include related Module data
      const result = await CourseModule.findOne({
        where: { id: newCourseModule.id },
        include: [Module],
      });
      console.log("🔥 NewCourseModule created:", newCourseModule.toJSON());

      console.log("📦 Created CourseModule (with Module relation):", result);

      res.status(201).json(result);
    } catch (err) {
      console.log("❌ Error in CourseModuleController.add:", err.message);
      console.log(err); // full error object
      next(err);
    }
  }

  // Remove module from course
  static async remove(req, res, next) {
    try {
      console.log("=== [CourseModuleController.remove] ===");
      console.log("Params received:", req.params);

      const { courseModuleId } = req.params;
      const courseModule = await CourseModule.findOne({
        where: { id: courseModuleId },
      });
      if (!courseModule) {
        console.log("❌ CourseModule not found for ID:", courseModuleId);
        return res.status(404).json({ message: "Data not found" });
      }

      await courseModule.destroy();
      console.log("✅ Deleted CourseModule ID:", courseModuleId);

      res.status(200).json({ message: "Deleted successfully" });
    } catch (err) {
      console.log("❌ Error in CourseModuleController.remove:", err.message);
      next(err);
    }
  }

  // Optional: Get all course-modules
  static async getAll(req, res, next) {
    try {
      console.log("=== [CourseModuleController.getAll] ===");

      const result = await CourseModule.findAll({
        include: [Course, Module],
      });

      console.log("📦 Total CourseModules fetched:", result.length);

      res.json(result);
    } catch (err) {
      console.log("❌ Error in CourseModuleController.getAll:", err.message);
      next(err);
    }
  }
}

module.exports = CourseModuleController;
