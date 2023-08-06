import jwt from "jsonwebtoken";
import { Types } from "mongoose";
import { UserNotFound, InvalidEmailOrPassword, InvalidUserId } from "../errors/db.errors.js";
import { UserExistError } from "../errors/auth.errors.js";
import User, { IUser, UserRoleEnum } from "../models/user.model.js";

type UserDetails = { userEmail: string; userPassword: string };
interface UserDetailsWithName extends UserDetails {
  userName: string;
}
export enum StripUserDetailsOptions {
  NO_PASSWORD = "NO_PASSWORD",
  NO_DATES = "NO_DATES",
  NO_DATES_AND_PASSWORD = "NO_DATES_AND_PASSWORD",
}

const checkIdFormat = (userId: string) => {
  if (!Types.ObjectId.isValid(userId)) throw new InvalidUserId();
};

const getUserByEmail = async (userEmail: string): IUser | null => {
  return await User.findOne({ email: userEmail }).select(`+password`);
};

async function getUserByEmailAndMatchPassword({ userEmail, userPassword }: UserDetails) {
  const user = await getUserByEmail(userEmail);

  if (user && (await user.matchPassword(userPassword))) {
    return user;
  } else {
    throw Error;
  }
}

const createJwtToken = (userId: string) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "14d" });
};

const isAdmin = (user: IUser) => {
  return user.role === UserRoleEnum.ADMIN;
};

async function getAllUsers() {
  try {
    return await User.find({});
  } catch (error) {
    console.log(`Error fetching all users`);
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

const checkIfUserExist = async (userEmail: string) => {
  const user = await getUserByEmail(userEmail);
  if (user) {
    throw new UserExistError();
  }
};

const createNewUser = async ({ userEmail, userPassword, userName }: UserDetailsWithName): IUser => {
  try {
    return await User.create({ email: userEmail, password: userPassword, name: userName });
  } catch (error) {
    throw error;
  }
};

const stripUserDetails = (user: IUser, options?: StripUserDetailsOptions) => {
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

const registerNewUser = async ({ userEmail, userPassword, userName }: UserDetailsWithName) => {
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
