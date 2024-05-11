import mongoose from "mongoose";

const ProgramSchema = new mongoose.Schema(
    {
      programName: {
        type: String,
        required: true,
        trim: true,
      },
      description: {
        type: String,
        required: true,
        trim: true,
      },
     
      startDate: {
        type: Date,
        required: true,
      },
      endDate: {
        type: Date,
        required: true,
      },
      trainer: {
        type: String,
        required: true,
        trim: true,
      },
      capacity: {
        type: Number,
        required: true,
      },
    
    },
    
    { timestamps: true }
  );
  
  export default mongoose.model("Program", ProgramSchema);