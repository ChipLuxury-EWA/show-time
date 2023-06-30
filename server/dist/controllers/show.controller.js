import asyncHandler from "../middleware/asyncHandler.js";
import showService from "../services/show.services.js";
export const getAllShows = asyncHandler(async (req, res) => {
    res.send(await showService.getAllShows());
});
export const getShowByID = asyncHandler(async (req, res) => {
    res.send(await showService.getShowByID(req.params.id));
});
