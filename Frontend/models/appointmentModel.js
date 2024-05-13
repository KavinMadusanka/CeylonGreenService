import mongoose from "mongoose";
import { type } from "os";

const appointmentSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        trim: true
    },
    address: {
        type: String,
        required: true,
        trim: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    email: {
        type: String,
    },
    servicePackage: {
        type: String,
        required: true,
    },
    comments: {
        type: String,
        trim: true
    },
    selectedDate: {
        type: String,
        required: true
    },
    selectedTime: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    Pprice: {
        type: Number,
    },
    status: {
        type: String,
        default: "Pending",
        enum: ["Pending", "Accepted", "Rejected"],
      },
},{timestamps:true})

export default mongoose.model('appointments',appointmentSchema)