import e from "express";
import { userController } from "../controller/userController.js";
import { booksController } from "../controller/booksController.js";
import { filmsController } from "../controller/filmController.js";
export const MutationRouter = e.Router();
MutationRouter.route("/user").post(userController.POST)
MutationRouter.route("/book").post(booksController.POST)
MutationRouter.route("/film").post(filmsController.POST)