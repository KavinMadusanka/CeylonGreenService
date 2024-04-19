import mongoose from 'mongoose';
const { Schema } = mongoose;

const UserModel = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        pNumber: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: true
        },
        role: {
            type: Number,
            default: 0
        }
    }
)

export default mongoose.model("Users", UserModel);