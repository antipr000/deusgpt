import { NextResponse } from "next/server";
import OtpRepository from "../../../db/repositories/Otp.repository";

export async function POST(request) {
  const body = await request.json();
  const email = body.email;
  const clientOtp = body.otp;

  const otpRepository = new OtpRepository();
  const otp = await otpRepository.getLatestValidOtpForEmail(email);
  await otpRepository.expireOtp(otp._id);

  if (!otp) {
    return NextResponse.json({ success: false, message: "Otp expired!" });
  } else if (otp.otp !== clientOtp) {
    return NextResponse.json({ success: false, message: "Otp mismatch" });
  } else {
    return NextResponse.json({ success: true });
  }
}
