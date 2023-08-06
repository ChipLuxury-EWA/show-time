import jwt from "jsonwebtoken";
import { Types } from "mongoose";
import User, { UserRoleEnum } from "../models/user.model.js";
import { UserExistError } from "../errors/auth.errors.js";
import { InvalidUserId } from "../errors/db.errors.js";
export var StripUserDetailsOptions;
(function (StripUserDetailsOptions) {
    StripUserDetailsOptions["NO_PASSWORD"] = "NO_PASSWORD";
    StripUserDetailsOptions["NO_DATES"] = "NO_DATES";
    StripUserDetailsOptions["NO_DATES_AND_PASSWORD"] = "NO_DATES_AND_PASSWORD";
})(StripUserDetailsOptions || (StripUserDetailsOptions = {}));
export const createNewUser = async ({ userEmail, userPassword, userName }) => {
    try {
        return await User.create({ email: userEmail, password: userPassword, name: userName });
    }
    catch (error) {
        throw error;
    }
};
export const createJwtToken = (userId, days = 14) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: `${days}d` });
};
export const isAdmin = (user) => {
    return user.role === UserRoleEnum.ADMIN;
};
export const checkIdFormat = (userId) => {
    if (!Types.ObjectId.isValid(userId))
        throw new InvalidUserId();
};
export const getUserByEmail = async (userEmail) => {
    return await User.findOne({ email: userEmail }).select(`+password`);
};
export const getUserByEmailAndMatchPassword = async ({ userEmail, userPassword }) => {
    const user = await getUserByEmail(userEmail);
    if (user && (await user.matchPassword(userPassword))) {
        return user;
    }
    else {
        throw Error;
    }
};
export const checkIfUserExist = async (userEmail) => {
    const user = await getUserByEmail(userEmail);
    if (user) {
        throw new UserExistError();
    }
};
export const stripUserDetails = (user, options) => {
    const { _id, name, email, role, createdAt, updatedAt, password } = user;
    switch (options) {
        case StripUserDetailsOptions.NO_DATES_AND_PASSWORD:
            return { _id, name, email, role };
        case StripUserDetailsOptions.NO_PASSWORD:
            return { _id, name, email, role, createdAt, updatedAt };
        case StripUserDetailsOptions.NO_DATES:
            return { _id, name, email, role, password };
        default:
            return user;
    }
};
