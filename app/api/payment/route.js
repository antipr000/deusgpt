import { NextResponse } from "next/server";
import StripeUtils from "../integrations/stripe";
import { getUidFromIdToken } from "../firebase/utils";
import UserRepository from "../db/repositories/User.repository";
import PaymentRepository from "../db/repositories/Payment.repository";
import { getIDTokenFromRequest } from "../utils";

export async function POST(request) {
  const idToken = getIDTokenFromRequest(request);
  console.log("idToken", idToken);
  const firebaseId = await getUidFromIdToken(idToken);
  const userRepository = new UserRepository();
  const user = await userRepository.getUserByFirebaseId(firebaseId);
  const body = await request.json();

  const stripe = new StripeUtils();

  const price = body["price"];
  const plan = body["plan"];
  const idempotencyKey = body["idempotencyKey"];

  const paymentData = await stripe.createPaymentSession(
    price,
    idempotencyKey,
    plan,
    user
  );

  return NextResponse.json(paymentData);
}

export async function GET(request) {
  const idToken = getIDTokenFromRequest(request);
  const sessionId = request.nextUrl.searchParams.get("sessionId");
  const userRepository = new UserRepository();
  const paymentRepository = new PaymentRepository();

  const firebaseId = await getUidFromIdToken(idToken);
  const user = await userRepository.getUserByFirebaseId(firebaseId);
  const paymentData = await paymentRepository.getPaymentBySessionId(sessionId);
  return NextResponse.json(paymentData);
}
