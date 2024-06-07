import DBProvider from "../mongo.client";

class ChatRepository {
  dbProvider;
  constructor() {
    this.dbProvider = new DBProvider();
  }

  async getAllChatSessions(firebaseId) {
    const chatSessionModel = await this.dbProvider.getChatSessionModel();
    const chatSessions = await chatSessionModel
      .find({ firebaseId })
      .sort({ createdAt: -1 });
    return chatSessions;
  }

  async createChatSession(request) {
    const chatSessionModel = await this.dbProvider.getChatSessionModel();
    const chatSession = await chatSessionModel.create(request);
    return chatSession;
  }
}

export default ChatRepository;
