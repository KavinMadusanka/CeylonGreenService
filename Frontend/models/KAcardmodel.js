import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type:String,
        required:true,
        trim:true
    },
    cardNumber: {
        type:Number,
        required:true,
        trim:true
    },
    cvv: {
        type:Number,
        required:true
    },
    email: {
        type:String,
        required:true,
    },
    month: {
        type:Number,
        required: true
    },
    year: {
        type:Number,
        required:true
    }

},{timestamps:true})

export default mongoose.model('bankcards',userSchema)