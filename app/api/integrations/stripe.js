import { Stripe } from "stripe";
import PaymentRepository from "../db/repositories/Payment.repository";
import { PaymentStatus } from "../domain/PaymentStatus";
import UserRepository from "../db/repositories/User.repository";
import { Plan } from "../domain/Plan";

export default class StripeUtils {
  constructor() {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    this.redirectURL = process.env.STRIPE_REDIRECT_URL;
    this.paymentRepository = new PaymentRepository();
  }

  async createPaymentSession(price, idempotencyKey, plan, user) {
    console.log("Stripe session generation", price, idempotencyKey);
    const lineItem = {
      price_data: {
        currency: "usd",
        unit_amount: price * 100,
        product_data: {
          name: "Premium DeusGPT",
          description: "Premium plan for DeusGPT",
        },
      },
      quantity: 1,
    };

    const session = await this.stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [lineItem],
      currency: "usd",
      mode: "payment",
      success_url: this.redirectURL + "?status=success",
      cancel_url: this.redirectURL + "?status=cancel",
    });

    const paymentData = await this.paymentRepository.createPayment({
      firebaseId: user.firebaseId,
      status: PaymentStatus.PENDING,
      plan,
      amount: price,
      sessionId: session.id,
      createdAt: new Date(),
    });
    return paymentData;
  }

  async getPaymentStatus(firebaseId, signal) {
    const paymentRepository = new PaymentRepository();
    const userRepository = new UserRepository();
    const payment = await paymentRepository.getLatestPendingPaymentForUser(
      firebaseId
    );
    /**
     * Stripe Docs:
     * invoice: ID of the invoice created by the Checkout Session, if it exists, null otherwise
     * payment_status: `paid`, `unpaid`, or `no_payment_required`
     * status:  `open`, `complete`, or `expired`
     */
    const { invoice, payment_status, status } =
      await this.stripe.checkout.sessions.retrieve(payment.sessionId);

    console.log("Stripe payment info: ", invoice, payment_status, status);

    if (signal === "success") {
      // For paid, we don't need any other check, update db
      let expiryDate = new Date();
      expiryDate.setMonth(expiryDate.getMonth() + 1);
      expiryDate.setHours(0, 0, 0, 0);
      await userRepository.updateUser(firebaseId, {
        plan: Plan.PREMIUM,
        planExpiry: expiryDate,
      });
      return await paymentRepository.updatePayment(payment._id, {
        invoiceId: invoice,
        completedAt: new Date(),
        status: PaymentStatus.SUCCESS,
      });
    } else if (signal === "cancel") {
      return await paymentRepository.updatePayment(payment._id, {
        status: PaymentStatus.CANCELLED,
        completedAt: new Date(),
      });
    }
    // Still pending, return the current payment info we have
    return payment;
  }
}
