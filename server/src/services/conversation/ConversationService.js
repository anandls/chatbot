export default class ConversationService {
  constructor(ConversationModel) {
    this.ConversationModel = ConversationModel;
  }

  async getConversation(sessionId) {
    const conversation = await this.ConversationModel.findOne({
      sessionId: sessionId,
    })
      .populate("messages")
      .populate("client", "firstname lastname");

    //change clientid to client

    console.log(conversation);

    return conversation;
  }
}
