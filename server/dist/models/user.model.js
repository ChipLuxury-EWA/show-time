import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";
export var UserRoleEnum;
(function (UserRoleEnum) {
    UserRoleEnum["ADMIN"] = "ADMIN";
    UserRoleEnum["SHOW_ORGANIZER"] = "SHOW_ORGANIZER";
    UserRoleEnum["BUYER"] = "BUYER";
})(UserRoleEnum || (UserRoleEnum = {}));
const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: UserRoleEnum, default: UserRoleEnum.BUYER, required: true },
}, { timestamps: true });
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};
const User = model("User", userSchema);
export default User;
