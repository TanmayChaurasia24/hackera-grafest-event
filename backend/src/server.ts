import express from "express";
import cors from "cors";
import { connectDB } from "./config/db";
import teamRoutes from "./routes/teamRoutes";
import questionRoutes from "./routes/questionRoutes";

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use("/api/teams", teamRoutes);
app.use("/api/questions", questionRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
