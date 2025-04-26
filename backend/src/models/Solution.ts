import mongoose from "mongoose";

const solutionSchema = new mongoose.Schema({
  teamId: {
    type: String,
    required: true,
    unique: true,
  },
  questionId: {
    type: Number,
    required: true,
    unique: true,
  },
  solution: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["correct", "wrong", "pending"],
    default: "pending",
  },
});

export const Solution = mongoose.model("Solution", solutionSchema);
