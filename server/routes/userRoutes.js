const UserController = require("../controllers/UserController");
const userRouter = require("express").Router();
const authenticate = require("../middlewares/Authenticate");
const authorize = require("../middlewares/Authorize");

userRouter.use(authenticate);

userRouter.get("/", authorize("admin"), UserController.getUsers);
userRouter.get("/:id", authorize("admin"), UserController.getUserById);
userRouter.post("/add", authorize("admin"), UserController.createUser);
userRouter.put("/:id", authorize("admin"), UserController.updateUser);
userRouter.delete("/:id", authorize("admin"), UserController.deleteUser);

module.exports = userRouter;
