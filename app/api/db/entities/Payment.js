import mongoose from "mongoose";
import { Plan } from "../../domain/Plan";
import { PaymentStatus } from "../../domain/PaymentStatus";

const paymentSchema = new mongoose.Schema({
  firebaseId: {
    type: String,
    required: true,
    trim: true,
  },
  status: {
    type: String,
    required: true,
    default: PaymentStatus.PENDING,
    enum: Object.values(PaymentStatus),
  },
  plan: {
    type: String,
    required: true,
    enum: Object.values(Plan),
  },
  amount: {
    type: Number,
    required: true,
  },
  sessionId: {
    type: String,
    required: true,
    unique: true,
  },
  invoiceId: {
    type: String,
    required: false,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  completedAt: {
    type: Date,
    required: false,
  },
});

// Take from already created schema if present, otherwise errors on hot reloading
const PaymentModel =
  mongoose.models.Payment || mongoose.model("Payment", paymentSchema);

export { PaymentModel };
