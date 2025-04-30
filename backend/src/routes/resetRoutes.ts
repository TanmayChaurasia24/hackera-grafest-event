import express from "express";
import { Team } from "../models/Team";
import { Status } from "../models/Status";
import bcrypt from "bcrypt";
const router = express.Router();

// Route to reset all team points
router.put("/points/:resetId", async (req, res) => {
  try {
    const { resetId } = req.params;
    if (process.env.RESET_ID !== resetId)
      return res.status(500).json({
        message: "Not allowed",
      });
    const result = await Team.updateMany({}, { $set: { points: 0 } });

    res.status(200).json({
      message: "Points reset successfully for all teams",
      modifiedCount: result.modifiedCount,
    });
  } catch (error) {
    console.error("Error resetting team points:", error);
    res.status(500).json({ message: "Failed to reset points", error });
  }
});

// Route to reset all team status to pending
router.put("/status/:resetId", async (req, res) => {
  try {
    const { resetId } = req.params;
    if (process.env.RESET_ID !== resetId)
      return res.status(500).json({
        message: "Not allowed",
      });
    const result = await Status.updateMany({}, { $set: { status: "pending" } });
    res.status(200).json({
      message: "Status reset successfully for all teams",
      modifiedCount: result.modifiedCount,
    });
  } catch (error) {
    console.error("Error resetting submission status", error);
    res.status(500).json({ message: "Failed to reset status", error });
  }
});

// Hashing all the passwords
router.put("/hash-passwords/:resetId", async (req, res) => {
  try {
    const { resetId } = req.params;
    if (process.env.RESET_ID !== resetId)
      return res.status(500).json({
        message: "Not allowed",
      });
    const teams = await Team.find({});

    if (teams.length === 0) {
      return res.status(404).json({ message: "No teams found" });
    }

    for (const team of teams) {
      // Check if already hashed (optional: you can skip if already hashed)
      if (!team.password.startsWith("$2a$")) {
        const hashedPassword = await bcrypt.hash(team.password, 10);
        team.password = hashedPassword;
        await team.save();
      }
    }

    res.json({ message: "Passwords hashed and updated successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating passwords", error });
  }
});

export default router;
