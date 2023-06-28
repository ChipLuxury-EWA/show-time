import express from "express";
import routesVersion1 from "./v1/routes.js";

const router = express.Router();

router.use("/v1", routesVersion1);
export default router;
