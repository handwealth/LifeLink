import express from "express";
import User from "../models/User.js";
import { authMiddleware } from "../middleware/authMiddleware.js";


const router = express.Router();

// ✅ Only allow admins
const adminOnly = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Access Denied. Admin only." });
  }
  next();
};

// ✅ Get all donors
router.get("/donors", authMiddleware, adminOnly, async (req, res) => {
  try {
    const donors = await User.find({ role: "donor" }).select("-password");
    res.status(200).json({ donors });
  } catch (error) {
    res.status(500).json({ message: "Error fetching donors", error });
  }
});

// ✅ Delete donor
router.delete("/delete/:id", authMiddleware, adminOnly, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Donor deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting donor", error });
  }
});

// ✅ Edit donor
router.put("/edit/:id", authMiddleware, adminOnly, async (req, res) => {
  try {
    const updatedDonor = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).select("-password");

    res.status(200).json({ message: "Donor updated", updatedDonor });
  } catch (error) {
    res.status(500).json({ message: "Error updating donor", error });
  }
});

export default router;
