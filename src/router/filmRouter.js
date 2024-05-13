import e from "express";
import { filmsController } from "../controller/filmController.js";

export const filmRouter = e.Router();

filmRouter.route("/").get(filmsController.GET);
filmRouter.route("/:filmId").get(filmsController.GET);