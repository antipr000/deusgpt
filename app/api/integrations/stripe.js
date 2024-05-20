import { Stripe } from "stripe";

export default class StripeUtils {
  constructor() {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    this.redirectURL = process.env.STRIPE_REDIRECT_URL;
  }

  async createPaymentSession(price, idempotencyKey) {
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
    return session.id;
  }
}
