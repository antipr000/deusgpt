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

  async createCustomer(user) {
    const userRepository = new UserRepository();
    const customer = await this.stripe.customers.create({
      email: user.email,
    });

    const updatedUser = await userRepository.updateUser(user.firebaseId, {
      stripeCustomerId: customer.id,
    });
    return updatedUser;
  }

  async createPaymentSession(price, idempotencyKey, plan, user) {
    // check if customer doesn't exist create new one
    if (!user.stripeCustomerId) {
      user = await this.createCustomer(user);
    }

    const lineItem = {
      price_data: {
        currency: "usd",
        unit_amount: price * 100,
        recurring: {
          interval: "month",
          interval_count: 1,
        },
        product_data: {
          name: "Premium DeusGPT",
          description: "Premium plan for DeusGPT",
        },
      },
    };

    const session = await this.stripe.checkout.sessions.create({
      customer: user.stripeCustomerId,
      payment_method_types: ["card"],
      line_items: [lineItem],
      currency: "usd",
      mode: "subscription",
      success_url: this.redirectURL + "?status=success&pid=" + idempotencyKey,
      cancel_url: this.redirectURL + "?status=cancel&pid=" + idempotencyKey,
    });

    const paymentData = await this.paymentRepository.createPayment({
      firebaseId: user.firebaseId,
      status: PaymentStatus.PENDING,
      plan,
      paymentId: idempotencyKey,
      amount: price,
      sessionId: session.id,
      createdAt: new Date(),
    });
    return paymentData;
  }

  async getPaymentStatus(firebaseId, signal, paymentId) {
    const paymentRepository = new PaymentRepository();
    const payment = await paymentRepository.getPaymentByPaymentId(paymentId);
    /**
     * Stripe Docs:
     * invoice: ID of the invoice created by the Checkout Session, if it exists, null otherwise
     * payment_status: `paid`, `unpaid`, or `no_payment_required`
     * status:  `open`, `complete`, or `expired`
     */
    if (payment.status === PaymentStatus.SUCCESS) {
      return payment;
    } else if (signal === "cancel") {
      return await paymentRepository.updatePayment(payment._id, {
        status: PaymentStatus.CANCELLED,
        completedAt: new Date(),
      });
    }
    // Still pending, return the current payment info we have
    return payment;
  }

  constructEvent(body, signature, webhookSecret) {
    return this.stripe.webhooks.constructEvent(body, signature, webhookSecret);
  }

  async savePaymentInformation(paymentStatus, body) {
    const userRepository = new UserRepository();
    const paymentRepository = new PaymentRepository();
    const customerId = body["customer"];
    const user = await userRepository.getUserByStripeCustomerId(customerId);

    // Update this logic so that we fetch pending payments only from last hour
    const pendingPayment =
      await paymentRepository.getLatestPendingPaymentForUser(user.firebaseId);

    let expiryDate = new Date();
    expiryDate.setMonth(expiryDate.getMonth() + 1);
    expiryDate.setDate(expiryDate.getDate() + 1);
    expiryDate.setHours(0, 0, 0, 0);

    if (pendingPayment) {
      await paymentRepository.updatePayment(payment._id, {
        invoiceId: body["invoice"],
        completedAt: new Date(),
        status: paymentStatus,
      });
    } else {
      // Subscription recurring payment, create new transaction
      await paymentRepository.createPayment({
        firebaseId: user.firebaseId,
        status: paymentStatus,
        plan: Plan.PREMIUM,
        amount: body["amount_total"],
        sessionId: body["id"],
        invoiceId: body["invoice"],
        createdAt: new Date(),
        completedAt: new Date(),
      });
    }

    if (paymentStatus === PaymentStatus.SUCCESS) {
      await userRepository.updateUser(user.firebaseId, {
        plan: Plan.PREMIUM,
        planExpiry: expiryDate,
      });
    } else {
      await userRepository.updateUser(user.firebaseId, {
        plan: Plan.STANDARD,
        planExpiry: null,
        subscriptionPaymentFailure: !pendingPayment,
      });
    }
  }
}
