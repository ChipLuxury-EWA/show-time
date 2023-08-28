import { Types } from "mongoose";
import { InvalidObjectId } from "../errors/db.errors.js";

export const checkIdFormat = (userId: string) => {
  if (!Types.ObjectId.isValid(userId)) throw new InvalidObjectId();
};