import Donor from "../models/Donor.js";
import User from "../models/User.js";

export const updateDonorProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { organ, bloodGroup, contact, address, availability } = req.body;

    // ✅ Check if donor profile exists
    let donor = await Donor.findOne({ userId });

    if (donor) {
      // ✅ Update existing donor profile
      donor.organ = organ;
      donor.bloodGroup = bloodGroup;
      donor.contact = contact;
      donor.address = address;
      donor.availability = availability;

      await donor.save();

      return res.json({ success: true, message: "Donor profile updated", donor });
    }

    // ✅ If profile doesn't exist, create a new one
    donor = new Donor({
      userId,
      organ,
      bloodGroup,
      contact,
      address,
      availability,
    });

    await donor.save();

    res.json({ success: true, message: "Donor profile created", donor });

  } catch (error) {
    console.error("Error updating donor:", error);
    res.status(500).json({ success: false, message: "Server Error", error });
  }
};


export const getDonors = async (req, res) => {
  try {
    const { organ, bloodGroup } = req.query;
    const query = {};

    if (organ) query.organ = organ;
    if (bloodGroup) query.bloodGroup = bloodGroup;

    const donors = await Donor.find(query).populate("userId", "name email");

    res.json(donors);

  } catch (error) {
    res.status(500).json({ message: "Search failed", error });
  }
};
