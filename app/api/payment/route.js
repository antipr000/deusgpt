import { NextResponse } from "next/server";
import { headers } from "next/headers";
import StripeUtils from "../integrations/stripe";
import { getUidFromIdToken } from "../firebase/utils";
import UserRepository from "../db/repositories/User.repository";

export async function POST(request) {
  const headerList = headers();
  const idToken = headerList.get("authorization");
  console.log("idToken", idToken);
  const firebaseId = await getUidFromIdToken(idToken);
  const userRepository = new UserRepository();
  const user = await userRepository.getUserByFirebaseId(firebaseId);
  const body = await request.json();

  const stripe = new StripeUtils();
  const idempotencyKey = `${user._id}_${new Date()
    .toDateString()
    .split(" ")
    .join("_")}`;

  const sessionId = await stripe.createPaymentSession(
    body["price"],
    idempotencyKey
  );

  return Response.json({ sessionId });
}

export async function GET(request) {
  const headerList = headers();
  const idToken = headerList.get("authorization");
  console.log("idToken", idToken);

  //   const firebaseId = await getUidFromIdToken(idToken);

  const sessionId = request.nextUrl.searchParams.get("sessionId");

  return Response.json({});
}
