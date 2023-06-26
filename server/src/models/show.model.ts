import { Schema, model } from "mongoose";

interface IShow {
  _id: string;
  // TODO tompo implement ts mongoose types:
  sellerId: any;
  categoryId: any;
  ticketsIds: any[];
  reviews: any;
  name: string;
  price: number;
  location: any;
  address: string;
  image: string;
  date: Date;
  time: number;
  minutesBeforePurchase: number;
  description: string;
  duration: number;
  cast: string[];
  rate: number;
}

const showSchema = new Schema<IShow>(
  {
    sellerId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    categoryId: { type: Schema.Types.ObjectId, required: true, ref: "Category" },
    ticketsIds: { type: [Schema.Types.ObjectId], required: true, ref: "Ticket" },
    name: { type: String, required: true },
    price: { type: Number, required: true, default: 0 },
    location: {type: Schema.Types.ObjectId},
    address: String,
    image: String,
    date: { type: Date, required: true },
    time: Number,
    minutesBeforePurchase: { type: Number, default: 30 },
    description: String,
    duration: Number,
    cast: [String],
    rate: { type: Number, required: true, default: 0 },
    reviews: [{ type: Schema.Types.ObjectId, required: true, ref: "Review" }],
  },
  { timestamps: true }
);

const Show = model("Show", showSchema);
export default Show;
