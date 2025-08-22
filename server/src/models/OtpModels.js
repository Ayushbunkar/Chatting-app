import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
  email: { type: String, required: true },
  otp: { type: String, required: true },
  name: { type: String }, // for registration
  password: { type: String }, // for registration
  createdAt: { type: Date, default: Date.now, expires: 300 }, // expires after 5 minutes
});

export default mongoose.model("Otp", otpSchema);
