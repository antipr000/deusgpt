import DBProvider from "../mongo.client";

class UserRepository {
  constructor() {
    this.dbProvider = new DBProvider();
  }

  async createNewUser(userData) {
    const userModel = await this.dbProvider.getUserModel();
    const data = await userModel.create(userData);
    return data;
  }

  async getUserById(id) {
    const userModel = await this.dbProvider.getUserModel();
    const data = await userModel.findById(id);
    return data;
  }

  async getUserByFirebaseId(firebaseId) {
    const userModel = await this.dbProvider.getUserModel();
    const data = await userModel.findOne({ firebaseId });
    return data;
  }

  async getUserByStripeCustomerId(stripeCustomerId) {
    const userModel = await this.dbProvider.getUserModel();
    const data = await userModel.findOne({ stripeCustomerId });
    return data;
  }

  async getUserByEmail(email) {
    const userModel = await this.dbProvider.getUserModel();
    const data = userModel.findOne({ email: email });
    return data;
  }

  async updateUser(firebaseId, userData) {
    const userModel = await this.dbProvider.getUserModel();
    const data = userModel.findOneAndUpdate({ firebaseId }, userData, {
      new: true,
    });
    return data;
  }
}

export default UserRepository;
