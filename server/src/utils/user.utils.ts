import jwt from "jsonwebtoken";
import { Types } from "mongoose";
import User, { IUser, UserRoleEnum } from "../models/user.model.js";
import { UserExistError } from "../errors/auth.errors.js";
import { InvalidUserId } from "../errors/db.errors.js";
import { ReturnedUserDetails, UserDetails, UserDetailsWithName } from "../services/user.services.js";

export enum StripUserDetailsOptions {
  NO_PASSWORD = "NO_PASSWORD",
  NO_DATES = "NO_DATES",
  NO_DATES_AND_PASSWORD = "NO_DATES_AND_PASSWORD",
}

export const createNewUser = async ({ userEmail, userPassword, userName }: UserDetailsWithName): Promise<IUser> => {
  try {
    return await User.create({ email: userEmail, password: userPassword, name: userName });
  } catch (error) {
    throw error;
  }
};

export const createJwtToken = (userId: string, days: number = 14): string => {
  return jwt.sign({ userId }, process.env.JWT_SECRET as string, { expiresIn: `${days}d` });
};

export const isAdmin = (user: IUser): boolean => {
  return user.role === UserRoleEnum.ADMIN;
};

export const checkIdFormat = (userId: string) => {
  if (!Types.ObjectId.isValid(userId)) throw new InvalidUserId();
};

export const getUserByEmail = async (userEmail: string): Promise<IUser | null> => {
  return await User.findOne({ email: userEmail }).select(`+password`);
};

export const getUserByEmailAndMatchPassword = async ({ userEmail, userPassword }: UserDetails) => {
  const user = await getUserByEmail(userEmail);

  if (user && (await user.matchPassword(userPassword))) {
    return user;
  } else {
    throw Error;
  }
};

export const checkIfUserExist = async (userEmail: string) => {
  const user = await getUserByEmail(userEmail);
  if (user) {
    throw new UserExistError();
  }
};

export const stripUserDetails = (user: IUser, options?: StripUserDetailsOptions): ReturnedUserDetails => {
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
