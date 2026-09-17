import { Schema, Document, model, Types } from "mongoose";

export interface IReview extends Document {
    restaurant: Types.ObjectId;
    userName: string;
    rating: number;
    comment: string;
    visitedDate: Date;
}

export const reviewSchema = new Schema(
    {
        restaurant: { type: Schema.Types.ObjectId, ref: "Restaurant", required: true },
        userName: { type: String, required: true },
        rating: { type: Number, required: true, min: 1, max: 5 },
        comment: { type: String, required: true },
        visitedDate: { type: Date, required: true },
    },
    {
        timestamps: true,
    }
);

export const Review = model<IReview>("Review", reviewSchema);
