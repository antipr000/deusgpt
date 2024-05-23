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

  async getPaymentByPaymentId(paymentId) {
    const paymentModel = await this.dbProvider.getPaymentModel();
    const data = await paymentModel.findOne({ paymentId });
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
        status: { $in: [PaymentStatus.PENDING, PaymentStatus.FAILURE] },
      })
      .sort({ createdAt: -1 }); // Sort payments by createdAt in descending order
    return data;
  }

  async getAllPaymentsForUser(firebaseId) {
    const paymentModel = await this.dbProvider.getPaymentModel();
    const data = await paymentModel.find({
      firebaseId,
      status: {
        $in: [
          PaymentStatus.PENDING,
          PaymentStatus.FAILURE,
          PaymentStatus.SUCCESS,
        ],
      },
    });
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
