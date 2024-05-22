import { NextResponse } from "next/server";
import StripeUtils from "../integrations/stripe";
import { PaymentStatus } from "../domain/PaymentStatus";

export async function POST(request) {
  const body = await request.json();
  console.log("Received stripe webhook call", body);

  const stripe = new StripeUtils();

  let data;
  let eventType;

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  const headerList = headers();
  const signature = headerList.get("stripe-signature");

  if (webhookSecret) {
    let event;
    try {
      event = stripe.constructEvent(body, signature, webhookSecret);
    } catch (e) {
      console.log(`Failed constructing event:`, e);
      return NextResponse.json(
        {
          message: "Failed to construct event",
        },
        { status: 400 }
      );
    }
    data = event.data.object;
    eventType = event.type;
  } else {
    data = body.data.object;
    eventType = body.type;
  }

  switch (eventType) {
    case "checkout.session.completed":
      // Payment is successful and the subscription is created.
      // You should provision the subscription and save the customer ID to your database.
      await stripe.savePaymentInformation(PaymentStatus.SUCCESS, data);
      break;
    case "invoice.paid":
      // Continue to provision the subscription as payments continue to be made.
      // Store the status in your database and check when a user accesses your service.
      // This approach helps you avoid hitting rate limits.
      await stripe.savePaymentInformation(PaymentStatus.SUCCESS, data);
      break;
    case "invoice.payment_failed":
      // The payment failed or the customer does not have a valid payment method.
      // The subscription becomes past_due. Notify your customer and send them to the
      // customer portal to update their payment information.
      await stripe.savePaymentInformation(PaymentStatus.FAILURE, data);
      break;
    default:
    // Unhandled event type
  }

  return NextResponse.json({});
}
