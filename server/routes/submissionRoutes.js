const submissionRoutes = require("express").Router();
const SubmissionController = require("../controllers/SubmissionController");
// const authenticate = require("../middlewares/Authenticate");
// const authorize = require("../middlewares/Authorize");

// submissionRoutes.use(authenticate);
submissionRoutes.get(
  "/",
  // authorize("admin"),
  SubmissionController.getSubmissions
);
submissionRoutes.get(
  "/:id",
  // authorize("admin"),
  SubmissionController.getSubmissionByUser
);
submissionRoutes.post(
  "/add",
  // authorize("admin"),
  SubmissionController.createSubmission
);
submissionRoutes.put(
  "/:id",
  // authorize("admin"),
  SubmissionController.gradeSubmission
);

module.exports = submissionRoutes;
