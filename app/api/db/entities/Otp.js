import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  expiresAt: {
    type: Date,
    required: true,
  },
});

// Take from already created schema if present, otherwise errors on hot reloading
const OtpModel = mongoose.models.Otp || mongoose.model("Otp", otpSchema);

export { OtpModel };
