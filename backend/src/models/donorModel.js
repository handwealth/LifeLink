import mongoose from "mongoose";

const donorSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    bloodGroup: String,
    organ: String,
    contact: String,
    address: String,
    availability: Boolean,
  },
  { timestamps: true }
);

export default mongoose.model("Donor", donorSchema);
