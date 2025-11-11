import express from "express";
import Donor from "../models/donorModel.js";
import User from "../models/User.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

/* ============================================================
   ✅ 1. Create donor profile
============================================================ */
router.post("/create", authMiddleware, async (req, res) => {
  try {
    const existingDonor = await Donor.findOne({ userId: req.user.id });
    if (existingDonor) {
      return res.status(400).json({ message: "Donor profile already exists" });
    }

    const donor = await Donor.create({
      userId: req.user.id,
      organ: req.body.organ,
      bloodGroup: req.body.bloodGroup,
      contact: req.body.contact,
      address: req.body.address,
      availability: req.body.availability,
    });

    res.status(201).json({ message: "Donor profile created", donor });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/* ============================================================
   ✅ 2. Update donor profile (PUT /api/donors/me)
============================================================ */
router.put("/me", authMiddleware, async (req, res) => {
  try {
    const updatedDonor = await Donor.findOneAndUpdate(
      { userId: req.user.id },
      {
        organ: req.body.organ,
        bloodGroup: req.body.bloodGroup,
        contact: req.body.contact,
        address: req.body.address,
        availability: req.body.availability,
      },
      { new: true, upsert: true }
    );

    res.json({
      message: updatedDonor ? "Donor profile updated" : "Donor profile created",
      donor: updatedDonor,
    });
  } catch (error) {
    res.status(500).json({ message: "Update failed", error });
  }
});

/* ============================================================
   ✅ 3. Get logged-in donor profile (GET /api/donors/me)
============================================================ */
router.get("/me", authMiddleware, async (req, res) => {
  try {
    const donor = await Donor.findOne({ userId: req.user.id })
      .populate("userId", "name email")
      .select("-__v");

    if (!donor) {
      return res.status(404).json({ message: "No donor profile found" });
    }

    res.status(200).json(donor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/* ============================================================
   ✅ 4. Delete donor profile
============================================================ */
router.delete("/me", authMiddleware, async (req, res) => {
  try {
    const donor = await Donor.findOneAndDelete({ userId: req.user.id });

    if (!donor) {
      return res.status(404).json({ message: "No donor profile found" });
    }

    res.json({ message: "Donor deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Deletion failed", error });
  }
});

/* ============================================================
   ✅ 5. Public Donor Search (No Login Needed)
   (GET /api/donors/search?organ=Heart&bloodGroup=O+)
============================================================ */
router.get("/search", async (req, res) => {
  try {
    const { organ, bloodGroup } = req.query;
    const filters = {};

    if (organ) filters.organ = organ;
    if (bloodGroup) filters.bloodGroup = bloodGroup;

    const donors = await Donor.find(filters)
      .populate("userId", "name email")
      .select("-__v");

    res.json(donors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/* ============================================================
   ✅ 6. Admin — Fetch Donors from User Model
   (GET /api/donors/donors?bloodGroup=A+&name=John)
============================================================ */
router.get("/donors", authMiddleware, async (req, res) => {
  try {
    const { bloodGroup, name } = req.query;
    let filters = { role: "donor" };

    if (bloodGroup) filters.bloodGroup = bloodGroup;
    if (name) filters.name = { $regex: name, $options: "i" };

    const donors = await User.find(filters).select("-password");

    res.json(donors);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch donors", error });
  }
});

export default router;
