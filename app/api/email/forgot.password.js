import OtpRepository from "../db/repositories/Otp.repository";
import sendEmail from "../integrations/mail";
import { generateOTP } from "../utils";

export default async function sendForgotPasswordEmail(email) {
  const otp = generateOTP(6);
  const otpRepository = new OtpRepository();
  // Set 5 mins expiry time
  const expiryTime = new Date();
  expiryTime.setMinutes(expiryTime.getMinutes() + 5);
  await otpRepository.createOtp({
    email,
    otp,
    createdAt: new Date(),
    expiresAt: expiryTime,
  });

  const html =
    "<p> Code for resetting your password: </p> <br> <br>" +
    `<h3> ${otp} </h3>`;

  const subject = "Recovery code for resetting your password";

  return await sendEmail(html, subject, email);
}
