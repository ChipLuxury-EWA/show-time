import express from "express";
import healthRoutes from "./health.routes.js";
import productsRoutes from "./show.routes.js";
import userRoutes from "./user.routes.js";
import orderRoutes from "./order.routes.js";
const router = express.Router();

router.use("/health", healthRoutes);
router.use("/shows", productsRoutes);
router.use("/user", userRoutes);
router.use("/order", orderRoutes);

export default router;
