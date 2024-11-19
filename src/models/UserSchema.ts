import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
    username: string;
    password: string;
}

const userSchema = new Schema<IUser>({
    username: { type: String, required: true },
    password: { type: String, required: true}
});

export const User = mongoose.models.User ?? mongoose.model("User", userSchema);