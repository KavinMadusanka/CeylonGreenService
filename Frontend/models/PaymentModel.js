import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    // slug: {
    //   type: String,
    //   required: true,
    // },
    orderId: {
      type: String
    },
    price: {
      type: Number,
      required: true,
    },
    address: {
      type: mongoose.ObjectId,
      ref: "deliveryaddresses",
      required: true,
    },
    photo: {
      data: Buffer,
      contentType: String,
    }
},{ timestamps: true });

export default mongoose.model("Payments", paymentSchema);