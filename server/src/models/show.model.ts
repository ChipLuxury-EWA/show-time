import { Schema, model } from "mongoose";

interface IShow {
  _id: string;
  // TODO tompo implement ts mongoose types:
  showOrganizer: string | undefined;
  categoryId: any;
  ticketsIds: any[];
  reviews: any;
  name: string;
  price: number;
  location: any;
  address: string;
  image: string;
  date: Date;
  time: Date;
  minutesBeforePurchase: number;
  description: string;
  duration: number;
  cast: string[];
  rate: number;
}

const showSchema = new Schema<IShow>(
  {
    showOrganizer: { type: Schema.Types.ObjectId, ref: "User" },
    categoryId: { type: String },
    ticketsIds: { type: [Schema.Types.ObjectId], ref: "Ticket" },
    name: { type: String, required: true },
    price: { type: Number, required: true, default: 0 },
    location: { type: String, enum: ["south", "north", "center"] },
    address: String,
    image: String,
    date: { type: Date, required: true },
    time: { type: Date, required: true },
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
