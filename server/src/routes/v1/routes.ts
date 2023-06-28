import express from "express";
import healthRoutes from "./health.routes.js";
import productsRoutes from "./show.routes.js";

const router = express.Router();

router.use("/health", healthRoutes);
router.use("/shows", productsRoutes);
export default router;
