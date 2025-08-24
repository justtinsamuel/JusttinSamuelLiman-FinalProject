const router = require("express").Router();
const base = "api";

router.get(`/${base}`, (req, res) => {
  res.json({ message: "WEB API" });
});

const checkpointRoutes = require("./checkpointRoutes");
const courseRoutes = require("./courseRoutes");
const enrollmentRoutes = require("./enrollmentRoutes");
const moduleRoutes = require("./moduleRoutes");
const submissionRoutes = require("./submissionRoutes");
const userRoutes = require("./userRoutes");

// router.use("/checkpoint", checkpointRoutes);
// router.use("/courses", courseRoutes);
// router.use("/enrollments", enrollmentRoutes);
// router.use("/modules", moduleRoutes);
// router.use("/submissions", submissionRoutes);
router.use("/users", userRoutes);

module.exports = router;
