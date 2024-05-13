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
    address: {
      type: String
    },
    cNumber: {
      type: String
    },
    // address: {
    //   type: mongoose.ObjectId,
    //   ref: "deliveryaddresses",
    //   required: true,
    // },
    province: {
      type: String
    },
    district: {
      type: String
    },
    postalcode: {
      type: String
    },
    card: {
      type: String
    },
    cardNumber: {
      type: String
    },
    email: {
      type:String,
      required:true,
  },
    Discription: {
      type: String
    },
    price: {
      type: Number,
    },
    photo: {
      data: Buffer,
      contentType: String,
    }
},{ timestamps: true });

export default mongoose.model("Payments", paymentSchema);