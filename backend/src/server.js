console.log("✅ server.js loaded from:", import.meta.url);

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import donorRoutes from "./routes/donorRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api", donorRoutes);
app.use("/api/donors", donorRoutes);

app.get("/", (req, res) => {
  res.send("LifeLink backend is running 🚑");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
