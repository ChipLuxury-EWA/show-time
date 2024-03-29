import { ObjectId, Schema, model } from "mongoose";

export interface IOrder extends Document {
  show: ObjectId;
  shippingAddress: string;
  paymentMethod: string;
  ticketsAmounts: number;
  itemsPrice: number;
  taxPrice: number;
  shippingPrice: number;
  user: ObjectId;
  isPaid: boolean;
  paidAt: Date;
  paymentResult: any;
  save: Function;
}

const orderSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    show: { type: Schema.Types.ObjectId, required: true, ref: "Show" },
    ticketsAmounts: { type: Number, required: true, default: 1 },
    shippingAddress: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
    },
    paymentMethod: { type: String, required: true },
    paymentResult: {
      id: { type: String },
      status: { type: String },
      update_time: { type: String },
      email_address: { type: String },
    },
    shippingPrice: { type: Number, default: 0.0 },
    itemsPrice: { type: Number, required: true, default: 0.0 },
    taxPrice: { type: Number, required: true, default: 0.0 },
    isPaid: { type: Boolean, required: true, default: false },
    paidAt: { type: Date },
    isDelivered: { type: Boolean, required: true, default: false }, //TODO tompo is user enter the show - QR scanned...
  },
  { timestamps: true }
);

const Order = model<IOrder>("Order", orderSchema);
export default Order;
