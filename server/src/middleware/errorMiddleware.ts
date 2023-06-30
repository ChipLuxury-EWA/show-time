import { Response, Request, NextFunction } from "express";
import dotenv from "dotenv";

dotenv.config();

export const RouteNotFound = (req: Request, res: Response, next: NextFunction) => {
  const error = new Error(`Not found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

export const errorHandler = (err, req: Request, res: Response, next: NextFunction) => {
  res.status((err.statusCode ||= 500)).json({
    // x ||= y        if x falsy assign y
    message: err.message,
    // TODO tompo add test to stack censorship
    stack: process.env.NODE_ENV === "production" ? "No stack trace in production" : err.stack,
  });
};
