import express from "express";
import { validateAdmin, validateUser } from "../../middleware/auth.middleware.js";
import { getAllOrders, getOrderByID, addNewOrder, updateOrderToPaid, updateOrderToDelivered, getOrdersByUserID, } from "../../controllers/order.controller.js";
const router = express.Router();
router
    .route("/")
    .get(validateUser, validateAdmin, getAllOrders)
    .post(validateUser, addNewOrder)
    .put()
    .delete();
router
    .route("/myorders")
    .get(validateUser, getOrdersByUserID)
    .post()
    .put()
    .delete();
router
    .route("/:id")
    .get(validateUser, getOrderByID)
    .post()
    .put()
    .delete();
router
    .route("/:id/paid")
    .get()
    .post()
    .put(validateUser, updateOrderToPaid)
    .delete();
router
    .route("/:id/delivered")
    .get()
    .post()
    .put(validateUser, validateAdmin, updateOrderToDelivered)
    .delete();
export default router;
