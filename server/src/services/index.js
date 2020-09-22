import ClientModel from "./client/ClientModel";
import ClientService from "./client/ClientService";

import AccountModel from "./account/AccountModel";
import AccountService from "./account/AccountService";

import MessageModel from "./message/MessageModel";
import MessageService from "./message/MessageService";

import SessionModel from "./session/SessionModel";
import SessionService from "./session/SessionService";

import ConversationModel from "./conversation/ConversationModel";
import ConversationService from "./conversation/ConversationService";

module.exports = {
  clientService: new ClientService(ClientModel),
  messageService: new MessageService(MessageModel),
  sessionService: new SessionService(SessionModel),
  conversationService: new ConversationService(ConversationModel),
  accountService: new AccountService(AccountModel),
};
