const enrollmentRoutes = require("express").Router();
const EnrollmentController = require("../controllers/EnrollmentController");
const authenticate = require("../middlewares/Authenticate");
const authorize = require("../middlewares/Authorize");

enrollmentRoutes.use(authenticate);
enrollmentRoutes.get("/", authorize("admin"), EnrollmentController.getEnrollments);
enrollmentRoutes.get("/:id", authorize("admin"), EnrollmentController.getEnrollmentByUser);
enrollmentRoutes.post("/add", authorize("admin"), EnrollmentController.createEnrollment);
enrollmentRoutes.put("/:id", authorize("admin"), EnrollmentController.updateEnrollment);
enrollmentRoutes.delete("/:id", authorize("admin"), EnrollmentController.deleteEnrollment);

module.exports = enrollmentRoutes;
