import express from "express";
import { Question } from "../models/Question";
import { Team } from "../models/Team";
import { Solution } from "../models/Solution";
import { authenticateToken } from "../middlewares/auth";
import { Status } from "../models/Status";

const router = express.Router();

// Get questions according the round
router.get(
  "/team/:teamId/day/:day/round/:round",
  async (req, res) => {
    try {
      const { teamId, day, round } = req.params;

      const team = await Team.findOne({teamId});
      if (!team) {
        return res.status(404).json({ message: "Team not found" });
      }

      const questions = await Question.find({
        day: parseInt(day),
        round: parseInt(round),
      });

      // Get status for all questions for this team
      const statuses = await Status.find({ teamId });
      
      // Map questions with their status
      const questionsWithStatus = questions.map(question => {
        const status = statuses.find(s => s.questionId === question.questionId);
        return {
          ...question.toObject(),
          isCorrect: status?.status === "correct" || false,
          solution: status?.status === "correct" ? null : undefined // Will be filled in front-end if correct
        };
      });

      res.json(questionsWithStatus);
    } catch (error) {
      res.status(500).json({ message: "Error fetching questions", error });
    }
  }
);

// Submit a solution
router.post("/submit", async (req, res) => {
  try {
    const { teamId, questionId, solution } = req.body;

    // Validate team
    const team = await Team.findOne({ teamId });
    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }

    // Validate question
    const question = await Question.findOne({ questionId });
    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    // Fetch the correct solution
    const correctSolution = await Solution.findOne({ questionId });
    if (!correctSolution) {
      return res.status(404).json({ message: "Correct solution not found" });
    }

    // Check for existing status
    let existingStatus = await Status.findOne({ teamId, questionId });

    // If already correct
    if (existingStatus && existingStatus.status === "correct") {
      return res
        .status(200)
        .json({ 
          message: "Solution already submitted and marked correct", 
          isCorrect: true,
          solution: correctSolution.solution 
        });
    }

    // Normalize solutions (case-insensitive)
    const submitted = solution.trim().toLowerCase();
    const correct = correctSolution.solution.trim().toLowerCase();

    // Validate solution
    if (submitted !== correct) {
      // Update or create wrong/pending status
      if (existingStatus) {
        existingStatus.status = "incorrect";
        await existingStatus.save();
      } else {
        await Status.create({ teamId, questionId, status: "incorrect" });
      }
      return res.status(200).json({ message: "Solution is incorrect", isCorrect: false });
    }

    // If solution is correct
    if (existingStatus) {
      existingStatus.status = "correct";
      await existingStatus.save();
    } else {
      await Status.create({ teamId, questionId, status: "correct" });
    }

    // Add points to team
    await Team.updateOne({ teamId }, { $inc: { points: 10 } });
    return res.status(200).json({ 
      message: "Solution is correct", 
      isCorrect: true, 
      solution: correctSolution.solution
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error submitting solution", error });
  }
});

// Get team points
router.get("/points", async (req, res) => {
  try {
    const teams = await Team.find({}, "teamId points").sort({ points: -1 }); // Sort by highest points

    res.json(teams);
  } catch (error) {
    res.status(500).json({ message: "Error fetching team points", error });
  }
});

// Get specific team points
router.get("/:teamId/points", async (req, res) => {
  try {
    const { teamId } = req.params;
    const team = await Team.findOne({ teamId }, "points");

    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }

    res.json({ points: team.points });
  } catch (error) {
    res.status(500).json({ message: "Error fetching team points", error });
  }
});

// Uncomment and update the endpoint to get answer status
router.get("/team/:teamId/question/:questionId/status", async (req, res) => {
  try {
    const { teamId, questionId } = req.params;

    // Check for existing status
    let status = await Status.findOne({ teamId, questionId });
    const solution = status?.status === "correct" 
      ? await Solution.findOne({ questionId }) 
      : null;

    return res.json({ 
      isCorrect: status?.status === "correct" || false,
      solution: status?.status === "correct" ? solution?.solution : undefined
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching team status", error });
  }
});

export default router;
