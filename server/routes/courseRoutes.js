const CourseController = require("../controllers/CourseController");
const courseRouter = require("express").Router();
// const authenticate = require("../middlewares/Authenticate");
// const authorize = require("../middlewares/Authorize");

// courseRouter.use(authenticate);

courseRouter.get(
  "/",
  //   authorize("admin"),
  CourseController.getCourses
);
courseRouter.get(
  "/:id",
  // authorize("admin"),
  CourseController.getCourseById
);
courseRouter.post(
  "/",
  // authorize("admin"),
  CourseController.createCourse
);
courseRouter.put(
  "/:id",
  // authorize("admin"),
  CourseController.updateCourse
);
courseRouter.delete(
  "/:id",
  // authorize("admin"),
  CourseController.deleteCourse
);

module.exports = courseRouter;
