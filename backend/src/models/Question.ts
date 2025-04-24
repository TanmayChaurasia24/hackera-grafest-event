import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  questionId: {
    type: Number,
    required: true,
    unique: true,
  },
  roundNumber: {
    type: Number,
    required: true
  },
  problem: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    required: true,
  }
});

export const Question = mongoose.model("Question", questionSchema);
