import { NextResponse } from "next/server";
import StripeUtils from "../../integrations/stripe";

export async function GET(request) {
  const sessionId = request.nextUrl.searchParams.get("sessionId");
  const stripe = new StripeUtils();
  await stripe.getPaymentStatus(sessionId);
  return NextResponse({});
}
