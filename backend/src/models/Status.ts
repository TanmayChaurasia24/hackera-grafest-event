import mongoose from "mongoose";

const statusSchema = new mongoose.Schema({
  teamId: {
    type: String,
    required: true,
    unique: true,
  },
  questionId: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["correct", "incorrect", "pending"],
    default: "pending",
  },
});

export const Status = mongoose.model("Status", statusSchema);
