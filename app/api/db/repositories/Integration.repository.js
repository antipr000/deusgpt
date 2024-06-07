import DBProvider from "../mongo.client";

class IntegrationRepository {
  constructor() {
    this.dbProvider = new DBProvider();
  }

  async createNewIntegration(integrationData) {
    const integrationModel = await this.dbProvider.getIntegrationModel();
    const data = await integrationModel.create(integrationData);
    return data;
  }

  async getIntegrationByName(name) {
    const integrationModel = await this.dbProvider.getIntegrationModel();
    const data = await integrationModel.findOne({ name });
    return data;
  }

  async getAllIntegrations() {
    const integrationModel = await this.dbProvider.getIntegrationModel();
    const data = await integrationModel.find({ enabled: true });
    const finalData = data.map(({ displayName, enabled, name, models }) => ({
      displayName,
      enabled,
      name,
      models,
    }));
    return finalData;
  }
}

export default IntegrationRepository;
