import express from "express";
import { Question } from "../models/Question";
import { Team } from "../models/Team";
import { Solution } from "../models/Solution";
import {authenticateToken} from "../middlewares/auth"

const router = express.Router();

// Get questions for a specific team based on their IP address
router.get("/team/:teamId/day/:day/round/:round", authenticateToken, async (req, res) => {
  try {
    const { teamId, day, round } = req.params;

    const team = await Team.findById(teamId);
    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }

    const questions = await Question.find({
      day: parseInt(day),
      round: parseInt(round),
    });

    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: "Error fetching questions", error });
  }
});


// Submit a solution
router.post("/submit", authenticateToken, async (req, res) => {
  try {
    const { teamId, questionId, solution, ipAddress } = req.body;

    // Validate team and question exist
    const team = await Team.findById(teamId);
    const question = await Question.findById(questionId);

    if (!team || !question) {
      return res.status(404).json({ message: "Team or question not found" });
    }

    // Check for existing solution
    const existingSolution = await Solution.findOne({ teamId, questionId, ipAddress });

    // If solution was previously correct, don't process again
    if (existingSolution?.status === "correct") {
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


// Get team points
router.get("/points", async(req,res)=>{
  try {
    const teams = await Team.find({}, "teamId points")
      .sort({ points: -1 }); // Sort by highest points

    res.json(teams);
  } catch (error) {
    res.status(500).json({ message: "Error fetching team points", error });
  }
})

export default router;
