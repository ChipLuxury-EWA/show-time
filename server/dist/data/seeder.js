import dotenv from "dotenv";
import fakeData from "./fakeData.js";
import User from "../models/user.model.js";
import Show from "../models/show.model.js";
import Order from "../models/order.model.js";
import Ticket from "../models/ticket.model.js";
import connectToMongoDB from "../config/dbConnect.js";
dotenv.config();
await connectToMongoDB();
const seedData = async () => {
    try {
        await cleanDB();
        const createdUsers = await User.insertMany(fakeData.users);
        // TODO tompo find by role
        const showOrganizer = createdUsers[1]._id; // find the show organizer
        const createdShows = await Show.insertMany(fakeData.shows);
        createdShows.forEach(async (show) => {
            var _a;
            show.showOrganizer = showOrganizer;
            const ticketsData = (_a = fakeData.shows.find((ogShow) => ogShow.name === show.name)) === null || _a === void 0 ? void 0 : _a.ticketsData;
            ticketsData === null || ticketsData === void 0 ? void 0 : ticketsData.forEach(async (ticket) => {
                const newTicket = new Ticket({
                    show: show._id,
                    discount: ticket.discountPrice,
                });
                show.ticketsIds.push(newTicket._id);
                await newTicket.save();
            });
        });
        await Show.find({})
            .cursor()
            .eachAsync(async (show) => {
            console.log(`updating ${show._id} tickets ids`);
            show.ticketsIds = createdShows.find((crShow) => crShow._id.equals(show._id)).ticketsIds;
            await show.save();
        });
        console.log("The seed has been implement");
        process.exit();
    }
    catch (error) {
        logError(error);
    }
};
const destroyData = async () => {
    try {
        await cleanDB();
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
    console.log("Cleaning DB");
    await User.deleteMany();
    await Show.deleteMany();
    await Order.deleteMany();
    await Ticket.deleteMany();
    console.log("DB is clean");
};
if (process.argv[2] === "-d") {
    destroyData();
}
else {
    seedData();
}
