const ModuleController = require("../controllers/ModuleController");
const moduleRouter = require("express").Router();
const authenticate = require("../middlewares/Authenticate");
const authorize = require("../middlewares/Authorize");

moduleRouter.use(authenticate);

moduleRouter.get("/", authorize("admin"), ModuleController.getModules);
moduleRouter.get("/:id", authorize("admin"), ModuleController.getModuleById);
moduleRouter.post("/add", authorize("admin"), ModuleController.createModule);
moduleRouter.put("/:id", authorize("admin"), ModuleController.updateModule);
moduleRouter.delete("/:id", authorize("admin"), ModuleController.deleteModule);

module.exports = moduleRouter;
