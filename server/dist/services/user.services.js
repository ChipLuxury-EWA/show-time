import jwt from "jsonwebtoken";
import { UserNotFound, InvalidEmailOrPassword } from "../errors/db.errors.js";
import User from "../models/user.model.js";
async function getAllUsers() {
    try {
        return await User.find({});
    }
    catch (error) {
        console.log(`Error fetching all users`);
    }
}
async function getUserByID(id) {
    try {
        return await User.findById(id);
    }
    catch (error) {
        if (error.name === "CastError") {
            throw new UserNotFound();
        }
        else {
            throw error;
        }
    }
}
async function getUserByEmail({ userEmail, userPassword }) {
    const user = await User.findOne({ email: userEmail }); // findOne return null if not found
    if (user && (await user.matchPassword(userPassword))) {
        return user;
    }
    else {
        throw Error;
    }
}
const createJwtToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "14d" });
};
const authenticateUser = async ({ userEmail, userPassword }) => {
    try {
        const { _id: userId, name, email, role } = await getUserByEmail({ userEmail, userPassword });
        const token = createJwtToken(userId);
        return { userId, name, email, role, token };
    }
    catch (error) {
        throw new InvalidEmailOrPassword();
    }
};
export default {
    getAllUsers,
    getUserByID,
    authenticateUser,
};
