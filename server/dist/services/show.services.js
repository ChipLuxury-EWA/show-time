import { ShowNotFound } from "../errors/db.errors.js";
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
        if (error.name === "CastError") {
            throw new ShowNotFound;
        }
        else {
            throw error;
        }
    }
}
export default {
    getAllShows,
    getShowByID,
};
