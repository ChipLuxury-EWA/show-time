import jwt from "jsonwebtoken";
import asyncHandler from "./asyncHandler.js";
import { Request, Response, NextFunction } from "express";
import userServices from "../services/user.services.js";
import { MissingToken, TokenFailed, ValidateAdminFailed } from "../errors/auth.errors.js";

//for protect routes:
export const validateUser = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const token: string = req.cookies.jwt;
  if (token) {
    try {
      const decoded: any = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await userServices.getUserById(decoded.userId);
      next();
    } catch (error) {
      throw new TokenFailed();
    }
  } else {
    throw new MissingToken();
  }
});

export const validateAdmin = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  if (req.user && userServices.isAdmin(req.user)) {
    next();
  } else {
    throw new ValidateAdminFailed();
  }
});
