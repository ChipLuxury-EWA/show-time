import { OrderNotFound } from "../errors/db.errors.js";
import Order from "../models/order.model.js";
import { checkIdFormat } from "../utils/db.utils.js";

interface IOrder {
  show: string;
  shippingAddress: string;
  paymentMethod: string;
  ticketsAmounts: number;
  ticketsPrice: number;
  taxPrice: number;
  shippingPrice: number;
  userId: string;
}

async function getAllOrders() {
  try {
    return await Order.find({});
  } catch (error) {
    console.log(`Error fetching all orders`);
  }
}

async function getOrderByID(orderId: string): IOrder {
  try {
    checkIdFormat(orderId);
    const order = await Order.findById(orderId).populate("user", "name email").populate("show", "image name price");
    if (order) {
      return order;
    } else {
      throw new OrderNotFound();
    }
  } catch (error: any) {
    throw error;
  }
}

async function getOrdersByUserID(userId: string) {
  try {
    checkIdFormat(userId);
    return await Order.find({ user: userId });
  } catch (error: any) {
    if (error.name === "CastError") {
      throw new OrderNotFound();
    } else {
      throw error;
    }
  }
}

const addNewOrder = async ({
  show,
  shippingAddress,
  paymentMethod,
  ticketsAmounts,
  ticketsPrice,
  taxPrice,
  shippingPrice,
  userId,
}: IOrder) => {
  const order = new Order({
    user: userId,
    show,
    shippingAddress,
    paymentMethod,
    ticketsAmounts,
    ticketsPrice,
    taxPrice,
    shippingPrice,
  });

  const createdOrder = await order.save();
  return createdOrder;
};

const updateOrderToPaid = () => {
  return "order is paid";
};

const updateOrderToDelivered = () => {
  return "order is delivered";
};

export default {
  getAllOrders,
  getOrderByID,
  addNewOrder,
  getOrdersByUserID,
  updateOrderToPaid,
  updateOrderToDelivered,
};
