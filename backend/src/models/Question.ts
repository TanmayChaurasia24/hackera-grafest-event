import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  questionId: {
    type: Number,
    required: true,
    unique: true,
  },
  problem: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    required: true,
  },
  isDownload: {
    type: Boolean,
    default: false,
  },
});

export const Question = mongoose.model("Question", questionSchema);
