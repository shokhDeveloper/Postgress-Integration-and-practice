import e from "express";
import { userController } from "../controller/userController.js";
export const userRouter = e.Router()
userRouter.route("/").get(userController.GET)
