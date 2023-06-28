import Show from "../models/show.model.js";
async function getAllShows() {
    try {
        return await Show.find({});
    }
    catch (error) {
        console.log(`Error fetching all shows`);
    }
}
async function getShowByID(id) {
    try {
        return await Show.findById(id);
    }
    catch (error) {
        console.log(`Error fetching show ${id}`);
        // TODO tompo add error handling
        return `Error fetching show ${id}`;
    }
}
export default {
    getAllShows,
    getShowByID,
};
