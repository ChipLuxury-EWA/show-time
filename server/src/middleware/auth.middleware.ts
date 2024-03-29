import jwt from "jsonwebtoken";
import asyncHandler from "./asyncHandler.js";
import { Request, Response, NextFunction } from "express";
import userServices from "../services/user.services.js";
import { MissingToken, TokenFailed, ValidateAdminFailed } from "../errors/auth.errors.js";
import { isAdmin } from "../utils/user.utils.js";
import { IUser } from "../models/user.model.js";

export interface RequestWithUserDetails extends Request {
  user: IUser;
}

//for protect routes:
export const validateUser = asyncHandler(async (req: RequestWithUserDetails, res: Response, next: NextFunction) => {
  const token: string = req.cookies.jwt;
  if (token) {
    try {
      const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);
      req.user = await userServices.getUserById(decoded.userId);
      next();
    } catch (error) {
      throw new TokenFailed();
    }
  } else {
    throw new MissingToken();
  }
});

export const validateAdmin = asyncHandler(async (req: RequestWithUserDetails, res: Response, next: NextFunction) => {
  if (req.user && isAdmin(req.user)) {
    next();
  } else {
    throw new ValidateAdminFailed();
  }
});
