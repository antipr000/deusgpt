import DBProvider from "../mongo.client";

class OtpRepository {
  constructor() {
    this.dbProvider = new DBProvider();
  }

  async createOtp(otp) {
    const otpModel = await this.dbProvider.getOtpModel();
    const newOtp = await otpModel.create(otp);
    return newOtp;
  }

  async getLatestValidOtpForEmail(email) {
    const otpModel = await this.dbProvider.getOtpModel();
    const otp = await otpModel
      .findOne({ email: email, expiresAt: { $gt: new Date() } })
      .sort("-createdAt")
      .exec();
    return otp;
  }

  async expireOtp(id) {
    const otpModel = await this.dbProvider.getOtpModel();
    await otpModel.findByIdAndUpdate(id, {
      expiresAt: new Date(),
    });
  }
}

export default OtpRepository;
