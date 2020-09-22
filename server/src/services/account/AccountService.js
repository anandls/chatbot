import AccountModel from "./AccountModel";

export default class AccountService {
  constructor() {}

  async findById(clientId) {
    const account = await AccountModel.findOne({
      owner: clientId,
    });

    return account;
  }

  async createAccount(data) {
    const account = data.account;
    let balance = parseInt(data.balance);
    let pinNumber = parseInt(data.pinNumber);
    const owner = data.owner;

    const newAccount = new AccountModel({
      account,
      balance,
      pinNumber,
      owner,
    });

    const accountCreated = await newAccount.save();
    return accountCreated;
  }

  async getAccount(clientId) {
    const account = await this.findById(clientId);
    return account;
  }
}
