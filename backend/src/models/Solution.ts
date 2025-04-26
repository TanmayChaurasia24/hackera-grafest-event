import mongoose from "mongoose";

const solutionSchema = new mongoose.Schema({
  teamId: {
    type: String,
    required: true,
  },
  roundNumber: {
    type: Number,
    required: true,
  },
  questionId: {
    type: Number,
    required: true,
  },
  ipaddress: {
    type: String,
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
  }
});

export const Solution = mongoose.model("Solution", solutionSchema);
