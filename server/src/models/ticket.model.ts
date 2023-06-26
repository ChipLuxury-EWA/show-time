import { Schema, model } from "mongoose";

const ticketSchema = new Schema({
  show: { type: Schema.Types.ObjectId, required: true, ref: "Show" },
  user: { type: Schema.Types.ObjectId, required: true, ref: "User" }, //TODO tompo user must be buyer
  status: { type: String, enum: ["available", "purchased"], default: "available", required: true },
  price: { type: Number, required: true },
  discount: { type: Number, required: true }, // discount in currency
  currency: { type: String, enum: ["nis", "usd"], default: "nis" },
});

const Ticket = model("Ticket", ticketSchema);
export default Ticket;
