import { Schema, model, Document } from "mongoose";
import bcrypt from "bcryptjs";

export enum UserRoleEnum {
  ADMIN = "ADMIN" ,
  SHOW_ORGANIZER = "SHOW_ORGANIZER" ,
  BUYER = "BUYER" ,
}

interface IUser extends Document {
  name: String;
  email: String;
  password: String;
  role: keyof typeof UserRoleEnum;
  matchPassword(enteredPassword: string): Promise<boolean>;
}

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: UserRoleEnum, default: UserRoleEnum.BUYER, required: true },
  },
  { timestamps: true }
);

userSchema.methods.matchPassword = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = model<IUser>("User", userSchema);
export default User;
