import jwt from "jsonwebtoken";
import { Types } from "mongoose";
import { UserNotFound, InvalidEmailOrPassword, InvalidUserId } from "../errors/db.errors.js";
import { UserExistError } from "../errors/auth.errors.js";
import User, { UserRoleEnum } from "../models/user.model.js";
export var StripUserDetailsOptions;
(function (StripUserDetailsOptions) {
    StripUserDetailsOptions["NO_PASSWORD"] = "NO_PASSWORD";
    StripUserDetailsOptions["NO_DATES"] = "NO_DATES";
    StripUserDetailsOptions["NO_DATES_AND_PASSWORD"] = "NO_DATES_AND_PASSWORD";
})(StripUserDetailsOptions || (StripUserDetailsOptions = {}));
const checkIdFormat = (userId) => {
    if (!Types.ObjectId.isValid(userId))
        throw new InvalidUserId();
};
const getUserByEmail = async (userEmail) => {
    return await User.findOne({ email: userEmail }).select(`+password`);
};
async function getUserByEmailAndMatchPassword({ userEmail, userPassword }) {
    const user = await getUserByEmail(userEmail);
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
async function getUserById(userId) {
    try {
        checkIdFormat(userId);
        const user = await User.findById(userId);
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
const checkIfUserExist = async (userEmail) => {
    const user = await getUserByEmail(userEmail);
    if (user) {
        throw new UserExistError();
    }
};
const createNewUser = async ({ userEmail, userPassword, userName }) => {
    try {
        return await User.create({ email: userEmail, password: userPassword, name: userName });
    }
    catch (error) {
        throw error;
    }
};
const stripUserDetails = (user, options) => {
    const { _id: userId, name, email, role, createdAt, updatedAt, password } = user;
    switch (options) {
        case StripUserDetailsOptions.NO_DATES_AND_PASSWORD:
            return { userId, name, email, role };
        case StripUserDetailsOptions.NO_PASSWORD:
            return { userId, name, email, role, createdAt, updatedAt };
        case StripUserDetailsOptions.NO_DATES:
            return { userId, name, email, role, password };
        default:
            return user;
    }
};
const registerNewUser = async ({ userEmail, userPassword, userName }) => {
    await checkIfUserExist(userEmail);
    const user = await createNewUser({ userEmail, userPassword, userName });
    return stripUserDetails(user, StripUserDetailsOptions.NO_DATES_AND_PASSWORD);
};
export default {
    isAdmin,
    getAllUsers,
    getUserById: getUserById,
    authenticateUser,
    registerNewUser,
};
