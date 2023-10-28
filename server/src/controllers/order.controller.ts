import asyncHandler from "../middleware/asyncHandler.js";
import orderService from "../services/order.services.js";
import { Request, Response } from "express";

export const getAllOrders = asyncHandler(async (req: Request, res: Response) => {
  res.send(await orderService.getAllOrders());
});

export const getOrderByID = asyncHandler(async (req: Request, res: Response) => {
  res.send(await orderService.getOrderByID(req.params.id));
});

export const getOrdersByUserID = asyncHandler(async (req: Request, res: Response) => {
  res.send(await orderService.getOrdersByUserID(req.user._id));
});

export const addNewOrder = asyncHandler(async (req: Request, res: Response) => {
  const ans = await orderService.addNewOrder({ ...req.body, userId: req.user._id });
  res.status(201).send(ans);
});

export const updateOrderToPaid = asyncHandler(async (req: Request, res: Response) => {
  res.send(await orderService.updateOrderToPaid({ orderId: req.params.id, payment: req.body.payment }));
});

export const updateOrderToDelivered = asyncHandler(async (req: Request, res: Response) => {
  const ans = await orderService.updateOrderToDelivered(req.body);
  res.send(ans);
});
