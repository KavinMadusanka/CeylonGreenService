import mongoose from "mongoose";
const { Schema } = mongoose;

const ContactModel = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        },
        message: {
            type: String,
            required: true
        },
        createdDate: {
            type: Date,
            default: Date.now
        }
    }
)

export default mongoose.model("Contacts", ContactModel);