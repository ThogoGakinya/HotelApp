import { Schema, Document, model, Types } from "mongoose";

export interface IBooking extends Document {
    bookingId: string;
    user: Types.ObjectId;
    restaurant: Types.ObjectId;
    date: Date;
    time: string;
    guests: number;
    occasion: string;
    specialRequests: string;
    status: "confirmed" | "cancelled" | "completed";
}

export const bookingSchema = new Schema(
    {
        bookingId: { type: String, required: true, unique: true },
        user: { type: Schema.Types.ObjectId, ref: "User", required: true },
        restaurant: { type: Schema.Types.ObjectId, ref: "Restaurant", required: true },
        date: { type: Date, required: true },
        time: { type: String, required: true },
        guests: { type: Number, required: true, min: 1 },
        occasion: { type: String, default: "" },
        specialRequests: { type: String, default: "" },
        status: { type: String, enum: ["confirmed", "cancelled", "completed"], default: "confirmed" },
    },
    {
        timestamps: true,
    }
);

export const Booking = model<IBooking>("Booking", bookingSchema);
