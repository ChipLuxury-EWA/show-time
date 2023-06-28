import express from "express";

import api from "../../controllers/show.controller.js";
const router = express.Router();

router
    .route("/")
    .get(api.getAllShows)
    .post()
    .put()
    .delete();

router
    .route("/:id")
    .get(api.getShowByID)
    .post()
    .put()
    .delete();

export default router;

// app.get("/api/v1/shows/:id", (req, res) => {
//   const show = fakeData.shows.find((show: show) => show._id === req.params.id);
//   //TODO tompo add 404 if show not found
//   console.log(show)
//   res.json(show);
// });