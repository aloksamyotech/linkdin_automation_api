import { Router } from "express";
import { asyncHandler } from "../../utils/asyncWrapper.js";
const userRouter = Router();
import * as UserController from "../../controllers/user.js";

userRouter.post("/register",asyncHandler(UserController.addUser));
userRouter.post("/login",asyncHandler(UserController.userLogin));

export default userRouter;
