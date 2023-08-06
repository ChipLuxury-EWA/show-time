import jwt from "jsonwebtoken";
import asyncHandler from "./asyncHandler.js";
import userServices from "../services/user.services.js";
import { MissingToken, TokenFailed, ValidateAdminFailed } from "../errors/auth.errors.js";
//for protect routes:
export const validateUser = asyncHandler(async (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await userServices.getUserById(decoded.userId);
            next();
        }
        catch (error) {
            throw new TokenFailed();
        }
    }
    else {
        throw new MissingToken();
    }
});
export const validateAdmin = asyncHandler(async (req, res, next) => {
    if (req.user && userServices.isAdmin(req.user)) {
        next();
    }
    else {
        throw new ValidateAdminFailed();
    }
});
