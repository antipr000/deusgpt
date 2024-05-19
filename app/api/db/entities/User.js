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
    createdAt: {
      type: Date,
      required: true
    }
  });
  
const UserModel = mongoose.model('User', userSchema);
  
export { UserModel };