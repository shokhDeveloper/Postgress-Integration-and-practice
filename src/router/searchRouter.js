import e from "express";
import { searchController } from "../controller/searchController.js";

export const searchRouter = e.Router();

searchRouter.route("/users").get(searchController.GET);
searchRouter.route("/books").get(searchController.GET);
searchRouter.route("/films").get(searchController.GET);
searchRouter.route("/global").get(searchController.GET)