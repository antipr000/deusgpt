import { PaymentStatus } from "../../domain/PaymentStatus";
import DBProvider from "../mongo.client";

export default class PaymentRepository {
  constructor() {
    this.dbProvider = new DBProvider();
  }

  async createPayment(paymentData) {
    const paymentModel = await this.dbProvider.getPaymentModel();
    const data = await paymentModel.create(paymentData);
    return data;
  }

  async getPayment(id) {
    const paymentModel = await this.dbProvider.getPaymentModel();
    const data = await paymentModel.findById(id);
    return data;
  }

  async getPaymentBySessionId(sessionId) {
    const paymentModel = await this.dbProvider.getPaymentModel();
    const data = await paymentModel.findOne({ sessionId });
    return data;
  }

  async getLatestPendingPaymentForUser(firebaseId) {
    const paymentModel = await this.dbProvider.getPaymentModel();
    const data = await paymentModel
      .findOne({
        firebaseId,
        status: PaymentStatus.PENDING,
      })
      .sort({ createdAt: -1 }); // Sort payments by createdAt in descending order
    return data;
  }

  async updatePayment(id, paymentData) {
    const paymentModel = await this.dbProvider.getPaymentModel();
    const data = await paymentModel.findByIdAndUpdate(id, paymentData, {
      new: true,
    });
    return data;
  }
}
