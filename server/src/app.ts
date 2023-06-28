import express, { Express } from "express";
import routes from "./routes/router.js";

const app: Express = express();

app.use("/api", routes);

export default app;
