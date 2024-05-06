import mongoose from "mongoose";


const SupplierSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        
    },
    address: {
        type: String,
        required: true,
    },
    contactNo: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    slug: {
        type: String,
        unique: true,
        index: true,
    },
},
{timestamps: true}
);



export default mongoose.model('Supplier', SupplierSchema);