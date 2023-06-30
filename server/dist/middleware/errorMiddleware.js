import { UrlNotFound } from "../errors/server.errors.js";
export const RouteNotFound = (req, res, next) => {
    throw new UrlNotFound(`URL Not found - ${req.originalUrl}`);
};
export const errorHandler = (err, req, res, next) => {
    res.status((err.statusCode || (err.statusCode = 500))).json({
        // x ||= y        if x falsy assign y
        message: err.message,
        // TODO tompo add test to stack censorship
        stack: process.env.NODE_ENV === "production" ? "No stack trace in production" : err.stack,
    });
};
