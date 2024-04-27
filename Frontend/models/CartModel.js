import mongoose from 'mongoose';

const CartItemSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Inventory',
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }
});

const CartSchema = new mongoose.Schema({
    cartItems: [CartItemSchema]
});

export default mongoose.model('Cart', CartSchema);
