import express, { Express } from "express";
import routes from "./routes/router.js";
import { errorHandler, RouteNotFound } from "./middleware/errorMiddleware.js";

const app: Express = express();

app.use(express.json());
app.use("/api", routes);
app.use(RouteNotFound);
app.use(errorHandler);

export default app;
