import mongoose from "mongoose";

const servicePackageSchema = new mongoose.Schema({
    Pname: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: String,
        required: true,
        trim: true
    },
},{timestamps:true})

export default mongoose.model('servicepackages',servicePackageSchema)