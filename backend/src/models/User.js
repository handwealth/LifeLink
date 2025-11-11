import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["donor", "requester", "admin"],
      default: "requester",
    },

    // ✅ Donor Profile Details
    organ: {
      type: String,
      enum: ["kidney", "liver", "heart", "lung", "cornea", "pancreas", null],
      default: null,
    },
    bloodGroup: {
      type: String,
      enum: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-", null],
      default: null,
    },
    phone: {
      type: String,
      default: null,
    },
    location: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
