import mongoose from "mongoose";
import { Plan } from "../../domain/Plan";

const userSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  plan: {
    type: String,
    required: false,
    default: Plan.STANDARD,
    enum: Object.values(Plan),
  },
  planExpiry: {
    type: Date,
    required: false,
  },
  isAdmin: {
    type: Boolean,
    required: false,
    default: false,
  },
  createdAt: {
    type: Date,
    required: true,
  },
});

// Take from already created schema if present, otherwise errors on hot reloading
const UserModel = mongoose.models.User || mongoose.model("User", userSchema);

export { UserModel };
