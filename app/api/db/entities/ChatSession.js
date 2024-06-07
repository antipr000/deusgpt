import mongoose from "mongoose";

const chatSessionSchema = new mongoose.Schema({
  agent: {
    required: true,
    type: String,
  },
  createdAt: {
    default: Date.now,
    required: true,
    type: Date,
  },
  firebaseId: {
    required: true,
    type: String,
  },
  name: {
    required: false,
    type: String,
  },
  sessionId: {
    required: true,
    trim: true,
    type: String,
    unique: true,
  },
  plugins: {
    default: [],
    required: false,
    type: [String],
  },
});

const ChatSessionModel =
  mongoose.models?.ChatSession ||
  mongoose.model("ChatSession", chatSessionSchema);

export { ChatSessionModel };
