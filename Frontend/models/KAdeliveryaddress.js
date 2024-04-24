import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type:String,
        required:true,
        trim:true
    },
    address: {
        type:String,
        required:true,
        trim:true
    },
    cNumber: {
        type:Number,
        required:true
    },
    province: {
        type:String,
        required:true
    },
    district: {
        type:String,
        required:true,
    },
    postalcode: {
        type:Number,
        required: true
    },
    email: {
        type:String,
    }

},{timestamps:true})

export default mongoose.model('deliveryaddresses',userSchema)