import { UserNotFound, InvalidEmailOrPassword, GetAllUsersError } from "../errors/db.errors.js";
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
const registerNewUser = async ({ userEmail, userPassword, userName }) => {
    await checkIfUserExist(userEmail);
    const user = await createNewUser({ userEmail, userPassword, userName });
    return stripUserDetails(user, StripUserDetailsOptions.NO_DATES_AND_PASSWORD);
};
export default {
    getAllUsers,
    getUserById,
    authenticateUser,
    registerNewUser,
};
