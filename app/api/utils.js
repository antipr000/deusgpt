import { headers } from "next/headers";

export function getIDTokenFromRequest(request) {
  const headerList = headers();
  const idToken = headerList.get("authorization");
  return idToken;
}

export function generateOTP(length) {
  let digits = "0123456789";
  let otp = "";
  for (let i = 0; i < length; i++) {
    otp += digits[Math.floor(Math.random() * 10)];
  }
  return otp;
}
