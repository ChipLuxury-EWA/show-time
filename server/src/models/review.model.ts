import { Schema, model } from "mongoose";

const reviewSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, required: true, ref: "User" }, //TODO tompo user must be buyer
    show: { type: Schema.Types.ObjectId, required: true, ref: "Show" },
    comment: { type: String, required: true },
    rate: { type: Number, required: true },
  },
  { timestamps: true }
);

const Review = model("Review", reviewSchema);
export default Review;
