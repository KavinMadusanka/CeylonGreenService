import mongoose from "mongoose";

const EmployeeSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
      trim: true,
    },
    lastname: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
      trim: true,
    },
    pronouns: {
      type: String,
      trim: true,
    },
    salary: {
      type: String,
      required: true,
    },
    leaves: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    profileImageUrl: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("employees", EmployeeSchema);
