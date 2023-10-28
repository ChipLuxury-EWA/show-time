import express, { Express } from "express";
import cookieParser from "cookie-parser";
import routes from "./routes/router.js";
import { errorHandler, RouteNotFound } from "./middleware/errorMiddleware.js";

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); // allow to get req.cookies.cookie_name
app.use("/api", routes);
app.get("/api/config/paypal", (req, res) => res.send({clientId: process.env.PAYPAL_CLIENT_ID}));
app.use(RouteNotFound);
app.use(errorHandler);

export default app;
