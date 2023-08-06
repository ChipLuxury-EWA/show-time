import { UserNotFound, InvalidEmailOrPassword, GetAllUsersError } from "../errors/db.errors.js";
import User, { IUser, UserRoleEnum } from "../models/user.model.js";
import {
  checkIdFormat,
  checkIfUserExist,
  createJwtToken,
  createNewUser,
  getUserByEmailAndMatchPassword,
  stripUserDetails,
} from "../utils/user.utils.js";
import { StripUserDetailsOptions } from "../utils/user.utils.js";
import { Response } from "express";

export type UserDetails = { userEmail: string; userPassword: string };
export interface UserDetailsWithName extends UserDetails {
  userName: string;
}

export type ReturnedUserDetails = {
  _id: string;
  name: string;
  email: string;
  role: keyof typeof UserRoleEnum;
  password?: string;
  createdAt?: string;
  updatedAt?: string;
  token?: any;
};

async function getAllUsers() {
  try {
    return await User.find({});
  } catch (error) {
    throw new GetAllUsersError();
  }
}

async function getUserById(userId: string): Promise<IUser | null> {
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

const authenticateUser = async ({ userEmail, userPassword }: UserDetails): Promise<ReturnedUserDetails> => {
  try {
    const user = await getUserByEmailAndMatchPassword({ userEmail, userPassword });
    const userDetails = stripUserDetails(user, StripUserDetailsOptions.NO_DATES_AND_PASSWORD);
    const token: string = createJwtToken(user._id);
    return { ...userDetails, token };
  } catch (error) {
    throw new InvalidEmailOrPassword();
  }
};

const registerNewUser = async ({
  userEmail,
  userPassword,
  userName,
}: UserDetailsWithName): Promise<ReturnedUserDetails> => {
  await checkIfUserExist(userEmail);
  const user = await createNewUser({ userEmail, userPassword, userName });
  const token: string = createJwtToken(user._id);
  return {...stripUserDetails(user, StripUserDetailsOptions.NO_DATES_AND_PASSWORD), token};
};

const implementTokenInResponse = (res: Response, token: string, days: number = 14) => {
  const maxAge = 1000 * 60 * 60 * 24 * days;
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge,
  });
};

export default {
  getAllUsers,
  getUserById,
  authenticateUser,
  registerNewUser,
  implementTokenInResponse,
};
