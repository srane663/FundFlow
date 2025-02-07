import { Router } from "express";
import userController from "../controllers/user-controller.js";
import asyncHandler from "../middlewares/asyncHandler.js";

const router = Router();

router
  .route("/")
  .get(asyncHandler(userController.getUsers))       //getUsers
  .post(asyncHandler(userController.createUser));
router
  .route("/:id")
  .get(asyncHandler(userController.getUserById))    //getUsersByID
  .put(asyncHandler(userController.updateUser))
  .delete(asyncHandler(userController.deleteUser));

export default router;
