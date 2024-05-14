import mongoose from "mongoose";
import { type } from "os";

const orderschema = new mongoose.Schema({
    cart: {
        type: Array,
    },
    email: {
        type: String,
    },
    price: {
        type: Number,
    },
    status: {
        type: String,
        default: "proccess",
        enum: ["proccess", "Order Placed", "Shipping", "deliverd"],
      },
},{timestamps:true})

export default mongoose.model('orders',orderschema)