import dotenv from "dotenv";

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

import cors from "cors";
import express from "express";
const app = express();
import { connectDB } from "./config.js";
app.use(express.json());
app.use(cors());

import authRoutes from "./routes/authRoutes.js";
import leaveRoutes from "./routes/leaveRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/leave", leaveRoutes);
app.use("/api/admin", adminRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
