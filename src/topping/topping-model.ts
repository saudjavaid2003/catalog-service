import mongoose from "mongoose";
import { Topping } from "./topping-types";
// todo : u are storing toppings per tenant for the moment okay but u have to make them per product 

const toppingSchema = new mongoose.Schema<Topping>(
    {
        name: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        tenantId: {
            type: String,
            required: true,
        },
    },
    { timestamps: true },
);

export default mongoose.model<Topping>("Topping", toppingSchema);