import { NextResponse } from "next/server";
import StripeUtils from "../../integrations/stripe";
import { getIDTokenFromRequest } from "../../utils";
import { getUidFromIdToken } from "../../firebase/utils";
import UserRepository from "../../db/repositories/User.repository";

export async function GET(request) {
  const idToken = getIDTokenFromRequest(request);
  const signal = request.nextUrl.searchParams.get("signal");

  const userRepository = new UserRepository();
  const stripe = new StripeUtils();

  const firebaseId = await getUidFromIdToken(idToken);
  await userRepository.getUserByFirebaseId(firebaseId);

  const payment = await stripe.getPaymentStatus(firebaseId, signal);

  return NextResponse(payment);
}
