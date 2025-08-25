const router = require("express").Router();

const checkpointRoutes = require("./checkpointRoutes");
const courseRoutes = require("./courseRoutes");
const enrollmentRoutes = require("./enrollmentRoutes");
const moduleRoutes = require("./moduleRoutes");
const submissionRoutes = require("./submissionRoutes");
const userRoutes = require("./userRoutes");
const authRoutes = require("./authRoutes");

router.use("/checkpoints", checkpointRoutes);
router.use("/courses", courseRoutes);
router.use("/enrollments", enrollmentRoutes);
router.use("/modules", moduleRoutes);
router.use("/submissions", submissionRoutes);
router.use("/users", userRoutes);
router.use("/auth", authRoutes);

module.exports = router;
