import { UserNotFound, InvalidEmailOrPassword, GetAllUsersError } from "../errors/db.errors.js";
import User, { IUser } from "../models/user.model.js";
import {
  checkIdFormat,
  checkIfUserExist,
  createJwtToken,
  createNewUser,
  getUserByEmailAndMatchPassword,
  stripUserDetails,
} from "../utils/user.utils.js";
import { StripUserDetailsOptions } from "../utils/user.utils.js";

export type UserDetails = { userEmail: string; userPassword: string };
export interface UserDetailsWithName extends UserDetails {
  userName: string;
}

async function getAllUsers() {
  try {
    return await User.find({});
  } catch (error) {
    throw new GetAllUsersError();
  }
}

async function getUserById(userId: string): IUser {
  try {
    checkIdFormat(userId);
    const user: IUser | null = await User.findById(userId);
    if (user) {
      return user;
    } else {
      throw new UserNotFound();
    }
  } catch (error: any) {
    throw error;
  }
}

const authenticateUser = async ({ userEmail, userPassword }: UserDetails) => {
  try {
    const { _id: userId, name, email, role } = await getUserByEmailAndMatchPassword({ userEmail, userPassword });
    const token: string = createJwtToken(userId);
    return { userId, name, email, role, token };
  } catch (error) {
    throw new InvalidEmailOrPassword();
  }
};

const registerNewUser = async ({ userEmail, userPassword, userName }: UserDetailsWithName) => {
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
