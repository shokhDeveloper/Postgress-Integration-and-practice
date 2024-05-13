import e from "express";
import { booksController } from "../controller/booksController.js";

export const bookRouter = e.Router();

bookRouter.route("/").get(booksController.GET);
bookRouter.route("/:bookId").get(booksController.GET)