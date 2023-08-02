import jwt from "jsonwebtoken";
import { Types } from "mongoose";
import { UserNotFound, InvalidEmailOrPassword, InvalidUserId } from "../errors/db.errors.js";
import User, { UserRoleEnum } from "../models/user.model.js";
const checkIdFormat = (userId) => {
    if (!Types.ObjectId.isValid(userId))
        throw new InvalidUserId();
};
async function getUserByEmailAndMatchPassword({ userEmail, userPassword }) {
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
const isAdmin = (user) => {
    return user.role === UserRoleEnum.ADMIN;
};
async function getAllUsers() {
    try {
        return await User.find({});
    }
    catch (error) {
        console.log(`Error fetching all users`);
    }
}
async function getUserByIdWithoutPassword(userId) {
    try {
        checkIdFormat(userId);
        const user = await User.findById(userId).select(`-password`);
        if (user) {
            return user;
        }
        else {
            throw new UserNotFound();
        }
    }
    catch (error) {
        throw error;
    }
}
const authenticateUser = async ({ userEmail, userPassword }) => {
    try {
        const { _id: userId, name, email, role } = await getUserByEmailAndMatchPassword({ userEmail, userPassword });
        const token = createJwtToken(userId);
        return { userId, name, email, role, token };
    }
    catch (error) {
        throw new InvalidEmailOrPassword();
    }
};
export default {
    isAdmin,
    getAllUsers,
    getUserByIdWithoutPassword,
    authenticateUser,
};
