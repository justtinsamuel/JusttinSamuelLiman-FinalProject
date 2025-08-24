const { UserController } = require('../controllers');
const userRouter = require('express').Router();

userRouter.get("/", UserController.getUsers);
userRouter.get("/:id", UserController.getUserById);
userRouter.post("/add", UserController.createUser);
userRouter.put("/", UserController.updateUser);
userRouter.delete("/", UserController.deleteUser);

module.exports = userRouter;