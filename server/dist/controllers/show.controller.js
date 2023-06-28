import showService from "../services/show.services.js";
async function getAllShows(req, res) {
    res.send(await showService.getAllShows());
}
async function getShowByID(req, res) {
    res.send(await showService.getShowByID(req.params.id));
}
export default {
    getAllShows,
    getShowByID,
};
