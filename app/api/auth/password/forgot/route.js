import { NextResponse } from "next/server";
import sendForgotPasswordEmail from "../../../email/forgot.password";

export async function POST(request) {
  const body = await request.json();
  const email = body.email;

  const response = await sendForgotPasswordEmail(email);

  return NextResponse.json({
    success: response,
  });
}
