import express from "express";
import routes from "./routes/router.js";
import { errorHandler, RouteNotFound } from "./middleware/errorMiddleware.js";
const app = express();
app.use(express.json());
app.use("/api", routes);
app.use(RouteNotFound);
app.use(errorHandler);
export default app;
