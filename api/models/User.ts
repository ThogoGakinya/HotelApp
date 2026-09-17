import { Schema, Document, model } from "mongoose";

export interface IUser extends Document {
    name: string;
    email: string;
    password?: string;
    phone?: string;
    role: "user" | "admin" | "owner";
}

export const userSchema = new Schema<IUser>(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true, minlength: 8, select: false },
        phone: { type: String },
        role: { type: String, enum: ["user", "admin", "owner"], default: "user" },
    },
    {
        timestamps: true,
    }

);
    userSchema.set("toJSON", {
        transform: function (doc, ret) {
            delete ret.password;
            return ret;
        }
    });



export const User = model<IUser>("User", userSchema);
