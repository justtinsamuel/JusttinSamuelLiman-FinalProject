const checkpointRoutes = require("express").Router();
const CheckpointController = require("../controllers/CheckpointController");
const authenticate = require("../middlewares/Authenticate");
const authorize = require("../middlewares/Authorize");

checkpointRoutes.use(authenticate);
checkpointRoutes.get("/", authorize("admin"), CheckpointController.getCheckpoints);
checkpointRoutes.get("/:id", authorize("admin"), CheckpointController.getCheckpointById);
checkpointRoutes.post("/add", authorize("admin"), CheckpointController.createCheckpoint);
checkpointRoutes.put("/:id", authorize("admin"), CheckpointController.updateCheckpoint);
checkpointRoutes.delete("/:id", authorize("admin"), CheckpointController.deleteCheckpoint);

module.exports = checkpointRoutes;