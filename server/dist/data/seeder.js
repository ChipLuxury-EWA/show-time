import dotenv from "dotenv";
import fakeData from "./fakeData.js";
import User from "../models/user.model.js";
import Show from "../models/show.model.js";
import Order from "../models/order.model.js";
import connectToMongoDB from "../config/dbConnect.js";
dotenv.config();
connectToMongoDB();
const seedData = async () => {
    try {
        cleanDB();
        const createdUsers = await User.insertMany(fakeData.users);
        const showOrganizer = createdUsers[1]._id; // TODO tompo find by role
        const sampleShows = fakeData.shows.map((show) => {
            return { ...show, showOrganizer: showOrganizer };
        });
        await Show.insertMany(sampleShows);
        console.log("The seed has been implement");
        process.exit();
    }
    catch (error) {
        logError(error);
    }
};
const destroyData = async () => {
    try {
        cleanDB();
        console.log("Data was destroyed successfully");
        process.exit();
    }
    catch (error) {
        logError(error);
    }
};
const logError = (error) => {
    console.log("ERROR:", error);
    process.exit(1);
};
const cleanDB = async () => {
    await User.deleteMany();
    await Show.deleteMany();
    await Order.deleteMany();
};
if (process.argv[2] === "-d") {
    destroyData();
}
else {
    seedData();
}
