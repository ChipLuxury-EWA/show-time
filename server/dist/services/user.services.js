import { UserNotFound, InvalidEmailOrPassword, GetAllUsersError } from "../errors/db.errors.js";
import { MissingNewUserDetails } from "../errors/user.errors.js";
import User from "../models/user.model.js";
import { checkIdFormat, checkIfUserExist, createJwtToken, createNewUser, getUserByEmailAndMatchPassword, stripUserDetails, } from "../utils/user.utils.js";
import { StripUserDetailsOptions } from "../utils/user.utils.js";
async function getAllUsers() {
    try {
        return await User.find({});
    }
    catch (error) {
        throw new GetAllUsersError();
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
const authenticateUser = async ({ email, password }) => {
    try {
        const user = await getUserByEmailAndMatchPassword({ email, password });
        const userDetails = stripUserDetails(user, StripUserDetailsOptions.NO_DATES_AND_PASSWORD);
        const token = createJwtToken(user._id);
        return { ...userDetails, token };
    }
    catch (error) {
        throw new InvalidEmailOrPassword();
    }
};
const registerNewUser = async ({ email, password, name }) => {
    await checkIfUserExist(email);
    const user = await createNewUser({ email, password, name });
    const token = createJwtToken(user._id);
    return { ...stripUserDetails(user, StripUserDetailsOptions.NO_DATES_AND_PASSWORD), token };
};
const implementTokenInResponse = (res, token, days = 14) => {
    const maxAge = 1000 * 60 * 60 * 24 * days;
    res.cookie("jwt", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict",
        maxAge,
    });
};
const updateUserProfileById = async (userId, newDetails) => {
    if (Object.keys(newDetails).length === 0)
        throw new MissingNewUserDetails();
    newDetails.email && (await checkIfUserExist(newDetails.email)); // check if new email is already taken by other user
    const user = await getUserById(userId);
    newDetails.name && (user.name = newDetails.name);
    newDetails.email && (user.email = newDetails.email);
    newDetails.password && (user.password = newDetails.password);
    const updateUser = await user.save();
    return stripUserDetails(updateUser, StripUserDetailsOptions.NO_DATES_AND_PASSWORD);
};
export default {
    getAllUsers,
    getUserById,
    authenticateUser,
    registerNewUser,
    implementTokenInResponse,
    updateUserProfileById,
};
