import mongoose from "mongoose";

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
        type: Date,
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
},{timestamps:true})

export default mongoose.model('appointments',appointmentSchema)