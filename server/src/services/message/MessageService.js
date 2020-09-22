//import ConversationModel from "../session/ConversationModel";
import ConversationModel from "../conversation/ConversationModel";
import generateId from "../../helpers/generateId";
import ClientService from "../client/ClientService";
import AccountService from "../account/AccountService";

export default class MessageService {
  constructor(MessageModel, AccountService) {
    this.MessageModel = MessageModel;
  }

  /*
  check for valid session in conversations
  */
  async findChatSession(sessionId) {
    const session = await ConversationModel.findOne({
      sessionId: sessionId,
    });

    return session;
  }

  /*
  lookup and return response
  */
  async lookupReplies(initiateArr, responseArr, text) {
    let element;
    let elements;

    for (let x = 0; x < initiateArr.length; x++) {
      for (let y = 0; y < responseArr.length; y++) {
        if (initiateArr[x][y] == text) {
          elements = responseArr[x];
          element = elements[Math.floor(Math.random() * elements.length)];
        }
      }
    }
    return element;
  }

  async generateResponse(incoming, author, authortype, sessionId) {
    let response;
    let text;

    const initiate = [
      [
        "hi",
        "hi there",
        "hello",
        "hello there",
        "hey",
        "hey there",
        "good afternoon",
        "good morning",
        "good day",
      ],
      ["how are you", "are you well", "how are things"],
      ["good", "great", "ok", "well", "well thanks"],
      ["bored", "not good", "not so good"],
      [
        "savings account",
        "the balance",
        "my account",
        "account balance",
        "my account balance",
        "check account balance",
        "current account",
      ],
      ["thanks", "thank you"],
      ["good bye", "goodbye", "bye"],
    ];

    const respond = [
      ["Hello, how can I help you today", "Hi, how can I help you today"],
      [
        "Good thank you and you?",
        "Fine, thank you and you",
        "Great, how are you?",
      ],
      ["Glad to hear it"],
      ["That is not good, hope I can help", "Cheer up"],
      ["Sure, "],
      ["No problem, my pleasure", "You are welcome"],
      ["Goodbye", "Goodbye, chat soon", "Goodbye, come back soon"],
    ];

    const other = ["I did not understand, please try again"];

    if (incoming) {
      text = incoming.toLowerCase().replace(/[^\w\s\d]/gi, "");

      text = text
        .replace(/ a /g, " ")
        .replace(/ is /g, " ")
        .replace(/please /g, "")
        .replace(/ please/g, "")
        .replace(/whats/g, "what is")
        .replace(/what's/g, "what is")
        .replace(
          /i want to check my balance for my savings account/g,
          "savings account"
        )
        .replace(/i want to check the balance for my account/g, "the balance")
        .replace(/balance for my account/g, "my account")
        .replace(/i want to check my account balance/g, "account balance")
        .replace(/please check my account balance/g, "my account balance")
        .replace(/i want to check my bank balance/g, "check account balance")
        .replace(/what is my current account balance/g, "current account");
    } else {
      text = "";
    }

    //i want to check the balance for my account

    /*
    make responses
    */
    if (await this.lookupReplies(initiate, respond, text.trim())) {
      const balanceArr = initiate[4];
      let balanceTextExists = balanceArr.includes(text.trim());

      if (balanceTextExists) {
        response = await this.lookupReplies(initiate, respond, text.trim());
        if (author && authortype === "CLIENT") {
          const accountService = new AccountService();
          const account = await accountService.getAccount(author);
          response =
            response + "you have R" + account.balance + " in your account";
        }
      } else {
        response = await this.lookupReplies(initiate, respond, text.trim());
      }
    } else {
      response = other[Math.floor(Math.random() * other.length)];
    }

    /*
    Add to db
    */
    if (!sessionId) {
      let newMessage;
      let newConversation;

      /*
      Add CLIENT message
      */
      newMessage = new this.MessageModel();
      newMessage.text = incoming.trim();
      newMessage.author = author;
      newMessage.authortype = "CLIENT";
      newMessage.save();

      newConversation = new ConversationModel();
      newConversation.sessionId = await generateId.objectId();
      newConversation.clientId = author;
      newConversation.messages.push(newMessage);
      newConversation.save();
      newConversation = null;

      /*
      Add BOT response
      */
      newMessage = new this.MessageModel();
      newMessage.text = response.trim();
      newMessage.author = null;
      newMessage.authortype = "BOT";
      newMessage.save();

      newConversation = new ConversationModel();
      newConversation.sessionId = await generateId.objectId();
      newConversation.clientId = author;
      newConversation.messages.push(newMessage);
      newConversation.save();

      let newSessionId = newConversation.sessionId;
      return { incoming, response, newSessionId };
    } else {
      let chatSession;
      let newMessage = new this.MessageModel();

      /*
      Add CLIENT message
      */
      chatSession = await this.findChatSession(sessionId);
      newMessage = new this.MessageModel();
      newMessage.text = incoming.trim();
      newMessage.author = author;
      newMessage.authortype = "CLIENT";
      newMessage.save();

      chatSession.messages.push(newMessage);
      chatSession.save();
      chatSession = null;

      /*
      Add BOT response
      */
      chatSession = await this.findChatSession(sessionId);
      newMessage = new this.MessageModel();
      newMessage.text = response.trim();
      newMessage.author = sessionId;
      newMessage.authortype = "BOT";
      newMessage.save();

      chatSession.messages.push(newMessage);
      chatSession.save();

      return { incoming, response, sessionId };
    }
  }

  async newMessage(incoming, author, authortype, session) {
    let sessionId;

    //sessionId ? console.log("sessionId : ", sessionId) : null;
    if (session) {
      sessionId = session;
    } else {
      sessionId = null;
    }

    const result = await this.generateResponse(
      incoming,
      author,
      authortype,
      sessionId
    );
    return result;
  }

  async getMessagesBySession(sessionId) {
    console.log("sessionId");
  }
}
