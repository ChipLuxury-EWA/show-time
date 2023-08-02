import jwt from "jsonwebtoken";
import { Types } from "mongoose";
import { UserNotFound, InvalidEmailOrPassword, InvalidUserId } from "../errors/db.errors.js";
import User, { IUser, UserRoleEnum } from "../models/user.model.js";

type UserDetails = { userEmail: string; userPassword: string };

const checkIdFormat = (userId: string) => {
  if (!Types.ObjectId.isValid(userId)) throw new InvalidUserId();
};

async function getUserByEmailAndMatchPassword({ userEmail, userPassword }: UserDetails) {
  const user = await User.findOne({ email: userEmail }); // findOne return null if not found

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

async function getUserByIdWithoutPassword(userId: string): IUser {
  try {
    checkIdFormat(userId);
    const user: IUser | null = await User.findById(userId).select(`-password`);
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

export default {
  isAdmin,
  getAllUsers,
  getUserByIdWithoutPassword,
  authenticateUser,
};
