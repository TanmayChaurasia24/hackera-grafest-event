import express from "express";
import { Question } from "../models/Question";
import { Team } from "../models/Team";
import { Solution } from "../models/Solution";

const router = express.Router();

// Get questions for a specific team based on their IP address
router.get("/team/:teamId", async (req, res) => {
  try {
    const { teamId } = req.params;

    const team = await Team.findById(teamId);
    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }

    // Get questions (in a real scenario, you might filter questions based on IP)
    const questions = await Question.find();

    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: "Error fetching questions", error });
  }
});

// Submit a solution
router.post("/submit", async (req, res) => {
  try {
    const { teamId, questionId, solution } = req.body;

    // Validate team and question exist
    const team = await Team.findById(teamId);
    const question = await Question.findById(questionId);

    if (!team || !question) {
      return res.status(404).json({ message: "Team or question not found" });
    }

    // Check for existing solution
    const existingSolution = await Solution.findOne({ teamId, questionId });

    // If solution was previously correct, don't process again
    if (existingSolution && existingSolution.status === "correct") {
      return res
        .status(400)
        .json({ message: "Solution already submitted and correct" });
    }
    if (solution !== existingSolution?.solution) {
      return res.status(400).json({ message: "Solution is incorrect" });
    }
    await Solution.updateOne({ teamId, questionId }, { status: "correct" });
    await Team.updateOne({ _id: teamId }, { $inc: { points: 10 } });
    return res.json({ message: "Solution is correct" });
  } catch (error) {
    res.status(500).json({ message: "Error submitting solution", error });
  }
});

export default router;
