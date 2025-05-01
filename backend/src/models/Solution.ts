import mongoose from "mongoose";

const solutionSchema = new mongoose.Schema({
  questionId: {
    type: String,
    required: true,
  },
  solution: {
    type: String,
    required: true,
  },
  
});

export const Solution = mongoose.model("Solution", solutionSchema);
