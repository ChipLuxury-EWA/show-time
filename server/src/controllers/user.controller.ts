import asyncHandler from "../middleware/asyncHandler.js";
import { RequestWithUserDetails } from "../middleware/auth.middleware.js";
import userService from "../services/user.services.js";
import { Request, Response } from "express";

// for public routes:
export const authUser = asyncHandler(async (req: Request, res: Response) => {
  const { _id, name, email, role, token } = await userService.authenticateUser(req.body);
  userService.implementTokenInResponse(res, token);
  res.send({ _id, name, email, role });
});

export const registerNewUser = asyncHandler(async (req: Request, res: Response) => {
  const { _id, name, email, role, token } = await userService.registerNewUser(req.body);
  userService.implementTokenInResponse(res, token);
  res.status(201).send({ _id, name, email, role });
});

export const logoutUser = asyncHandler(async (req: Request, res: Response) => {
  res.clearCookie("jwt");
  res.send("logging out user");
});

// for private user routes:
export const getUserProfileByID = asyncHandler(async (req: RequestWithUserDetails, res: Response) => {
  res.send(await userService.getUserById(req.user._id));
});

export const updateUserProfileById = asyncHandler(async (req: RequestWithUserDetails, res: Response) => {
  res.send(await userService.updateUserProfileById(req.user._id, req.body));
});

// for private admin routes:
export const getAllUsers = asyncHandler(async (req: Request, res: Response) => {
  res.send(await userService.getAllUsers());
});

export const getUserByID = asyncHandler(async (req: Request, res: Response) => {
  res.send(await userService.getUserById(req.params.id));
});

export const updateUser = asyncHandler(async (req: Request, res: Response) => {
  res.send("update user...!");
});

export const deleteUser = asyncHandler(async (req: Request, res: Response) => {
  res.send("deleting user...!");
});
