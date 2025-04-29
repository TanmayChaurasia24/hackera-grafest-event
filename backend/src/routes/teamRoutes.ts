import express from "express";
import { Team } from "../models/Team";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();


// Register a new team
router.post("/register", async (req, res) => {
  try {
    const { teamId, password } = req.body;

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

    // Generate JWT token for session management
    const token = jwt.sign(
      { id: team._id, teamId: team.teamId, points: team.points },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "6h" }
    );

    res.json({
      message: "Login successful",
      teamId: team._id,
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
});

// Hashing all the passwords
router.put("/hash-passwords", async (req, res) => {
  try {
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
