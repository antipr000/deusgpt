import { loadStripe } from "@stripe/stripe-js";
import { generateStripeSessionToken } from "./api";

export async function initiatePayment(idToken, price, planId) {
  const idempotencyKey = `${idToken}_${new Date().valueOf()}`;
  const sessionId = await generateStripeSessionToken(
    price,
    planId,
    idempotencyKey
  );
  const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
  const stripe = await loadStripe(publishableKey);
  const result = await stripe.redirectToCheckout({
    sessionId: sessionId,
  });
  return result;
}

export const pricingOptions = [
  {
    heading: "Standard",
    description: "Free trial of DeusGPT",
    planId: "standard",
    discountedPrice: 0,
    originalPrice: 0,
    popular: false,
    features: ["ChatGPT 3.5", "15k tokens per day"],
  },
  {
    heading: "Premium",
    description: "Get access to exclusive features.",
    planId: "premium",
    discountedPrice: 9.99,
    originalPrice: 15,
    popular: true,
    features: [
      "ChatGPT 4.0 access",
      "15k tokens per day",
      "Translate available",
    ],
  },
];
