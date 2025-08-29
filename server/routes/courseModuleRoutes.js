const courseModuleRoutes = require("express").Router();
const CourseModuleController = require("../controllers/CourseModuleController.js");

courseModuleRoutes.post("/", CourseModuleController.add);
courseModuleRoutes.delete("/:courseModuleId", CourseModuleController.remove);

module.exports = courseModuleRoutes;
