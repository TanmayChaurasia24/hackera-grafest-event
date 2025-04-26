import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  day: {
    type: Number,
    required: true,
  },
  round: {
    type: Number,
    required: true,
  },
  questionId: {
    type: String,
    required: true,
    unique: true,
  },
  problem: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    default: "",
  },
});

export const Question = mongoose.model("Question", questionSchema);
