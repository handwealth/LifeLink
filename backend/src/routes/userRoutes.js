import express from "express";
import { updateDonorProfile } from "../controllers/donorController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// donor profile update
router.put("/donor/profile", authMiddleware, updateDonorProfile);

export default router;
