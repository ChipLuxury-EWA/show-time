import express from "express";
import { getAllShows, getShowByID } from "../../controllers/show.controller.js";
const router = express.Router();
router
    .route("/")
    .get(getAllShows)
    .post()
    .put()
    .delete();
router
    .route("/:id")
    .get(getShowByID)
    .post()
    .put()
    .delete();
export default router;
