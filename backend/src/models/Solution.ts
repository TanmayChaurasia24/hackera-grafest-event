import mongoose from "mongoose";

const solutionSchema = new mongoose.Schema({
  teamId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Team",
    required: true,
  },
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Question",
    required: true,
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
