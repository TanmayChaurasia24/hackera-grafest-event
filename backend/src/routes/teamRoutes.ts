import express from "express";
import { Team } from "../models/Team";
import bcrypt from "bcrypt";

const router = express.Router();

// Register a new team
router.post("/register", async (req, res) => {
  try {
    const { teamId, password, ipaddress } = req.body;

    // Check if team already exists
    const existingTeam = await Team.findOne({ teamId });
    if (existingTeam) {
      return res.status(400).json({ message: "Team already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new team
    const team = new Team({
      teamId,
      password: hashedPassword,
      ipaddress,
      points: 0,
    });

    await team.save();
    res.status(201).json({ message: "Team registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error registering team", error });
  }
});

// Login team
router.post("/login", async (req, res) => {
  try {
    const { teamId, password } = req.body;

    const team = await Team.findOne({ teamId });
    if (!team) {
      return res.status(404).json({ message: "Team not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, team.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.json({ message: "Login successful", teamId: team._id });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
});

export default router;
