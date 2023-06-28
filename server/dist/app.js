import express from "express";
import routes from "./routes/router.js";
const app = express();
app.use("/api", routes);
export default app;
