import { NextResponse } from "next/server";
import { resetUserPassword } from "../../../firebase/utils";

export async function POST(request) {
  const body = await request.json();
  const email = body.email;
  const password = body.password;

  const result = await resetUserPassword(email, password);

  return NextResponse.json({ success: result });
}
