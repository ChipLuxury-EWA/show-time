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
    password: { type: String, required: true, select: false },
    role: { type: String, enum: UserRoleEnum, default: UserRoleEnum.BUYER, required: true },
}, { timestamps: true });
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});
const User = model("User", userSchema);
export default User;
