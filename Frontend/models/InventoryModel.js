import mongoose from "mongoose";


const InventorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        unique: true,
        
    },

    price: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    photo: {
        data: Buffer,
        contentType: String,
    },
    // category: {
    //     type: String,
    // },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "category",
        required: true,
    },
    // supplier: {
    //     type: String,
    // },
    supplier: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Supplier",
        required: true,
    },
    reorderLevel: {
        type: Number,
        required: true,
    },
    
    
},
{timestamps: true}
);


export default mongoose.model("Inventory",InventorySchema);