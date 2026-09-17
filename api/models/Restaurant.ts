import { Schema, Document, model, Types } from "mongoose";

export interface IRestaurant extends Document {
    name: string;
    slug: string;
    description: string;
    cuisine: string;
    priceRange: string;
    rating: number;
    reviewCount: number;
    location: string;
    address: string;
    image: string;
    chef: string;
    tags: string[];
    availableSlots: string[];
    featured: boolean;
    exclusive: boolean;
    owner: Types.ObjectId;
    status: "approved" | "pending" | "rejected";
    totalSeats: number;
}

export const restaurantSchema = new Schema(
    {
        name: { type: String, required: true },
        slug: { type: String, required: true, unique: true },
        description: { type: String, required: true },
        cuisine: { type: String, required: true },
        priceRange: { type: String, required: true },
        rating: { type: Number, default: 0 },
        reviewCount: { type: Number, default: 0 },
        location: { type: String, required: true },
        address: { type: String, required: true },
        image: { type: String, default: "/default_restaurant_Img.jpeg" },
        chef: { type: String, required: true },
        tags: [{ type: String }],
        availableSlots: [{ type: String }],
        featured: { type: Boolean, default: false },
        exclusive: { type: Boolean, default: false },
        owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
        status: { type: String, enum: ["approved", "pending", "rejected"], default: "pending" },
        totalSeats: { type: Number, required: true, min: 1 },
    },
    {
        timestamps: true,
    }
);

export const Restaurant = model<IRestaurant>("Restaurant", restaurantSchema);
