import { OrderNotFound } from "../errors/db.errors.js";
import Order from "../models/order.model.js";
import { checkIdFormat } from "../utils/db.utils.js";
async function getAllOrders() {
    try {
        return await Order.find({});
    }
    catch (error) {
        console.log(`Error fetching all orders`);
    }
}
async function getOrderByID(orderId) {
    try {
        checkIdFormat(orderId);
        const order = await Order.findById(orderId).populate("user", "name email").populate("show", "image name price");
        if (order) {
            return order;
        }
        else {
            throw new OrderNotFound();
        }
    }
    catch (error) {
        throw error;
    }
}
async function getOrdersByUserID(userId) {
    try {
        checkIdFormat(userId);
        return await Order.find({ user: userId });
    }
    catch (error) {
        if (error.name === "CastError") {
            throw new OrderNotFound();
        }
        else {
            throw error;
        }
    }
}
const addNewOrder = async ({ show, shippingAddress, paymentMethod, ticketsAmounts, itemsPrice, taxPrice, shippingPrice, user, }) => {
    const order = new Order({
        user,
        show,
        shippingAddress,
        paymentMethod,
        ticketsAmounts,
        itemsPrice,
        taxPrice,
        shippingPrice,
    });
    const createdOrder = await order.save();
    return createdOrder;
};
const updateOrderToPaid = async ({ orderId, payment }) => {
    //TODO tompo: add try catch here.
    const order = await getOrderByID(orderId);
    order.isPaid = true;
    order.paidAt = new Date();
    order.paymentResult = {
        id: payment.id,
        status: payment.status,
        update_time: payment.update_time,
        email_address: payment.payer.email_address,
    };
    const updatedOrder = order.save();
    return updatedOrder;
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
