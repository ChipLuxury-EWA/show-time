import asyncHandler from "../middleware/asyncHandler.js";
import userService from "../services/user.services.js";
import { Request, Response } from "express";

const maxAge = 1000 * 60 * 60 * 24 * 14; // 14 days
// for public routes:
export const authUser = asyncHandler(async (req: Request, res: Response) => {
  const { userEmail, userPassword } = req.body;
  const { userId, name, email, role, token } = await userService.authenticateUser({ userEmail, userPassword });
  
  res.cookie('jwt', token,{httpOnly: true, secure: process.env.NODE_ENV !== 'development', sameSite: 'strict', maxAge});
  res.send({ userId, name, email, role });
});

export const registerNewUser = asyncHandler(async (req: Request, res: Response) => {
  res.send("registering user...!");
});

export const logoutUser = asyncHandler(async (req: Request, res: Response) => {
  res.send("logging out user");
});

// for private user routes:
export const getUserProfileByID = asyncHandler(async (req: Request, res: Response) => {
  res.send("getting user profile by id");
});

export const updateUserProfileById = asyncHandler(async (req: Request, res: Response) => {
  res.send("updating profile");
});

// for private admin routes:
export const getAllUsers = asyncHandler(async (req: Request, res: Response) => {
  res.send(await userService.getAllUsers());
});

export const getUserByID = asyncHandler(async (req: Request, res: Response) => {
  res.send(await userService.getUserByID(req.params.id));
});

export const updateUser = asyncHandler(async (req: Request, res: Response) => {
  res.send("update user...!");
});

export const deleteUser = asyncHandler(async (req: Request, res: Response) => {
  res.send("deleting user...!");
});
