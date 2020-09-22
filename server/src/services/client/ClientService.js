import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { cli } from "winston/lib/winston/config";

import AccountService from "../account/AccountService";

export default class ClientService {
  constructor(ClientModel) {
    this.ClientModel = ClientModel;
  }

  async findByEmail(email) {
    const client = await this.ClientModel.findOne({
      email: email,
    });

    return client;
  }

  async findById(clientId) {
    const client = await this.ClientModel.findOne({
      _id: clientId,
    });

    return client;
  }

  async verifyPassword(password, clientPassword) {
    const isMatch = await bcryptjs.compare(password, clientPassword);
    return isMatch;
  }

  async signup(data) {
    const {
      firstname,
      lastname,
      email,
      password,
      mobile,
      account,
      balance,
      pinNumber,
    } = data;

    let newClient = new this.ClientModel({
      firstname,
      lastname,
      email,
      mobile,
    });

    try {
      const salt = await bcryptjs.genSalt(10);
      newClient.password = await bcryptjs.hash(password, salt);
      const client = await newClient.save();
      const owner = client.id;

      const payload = { id: owner };
      const token = await jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: 3600000,
      });

      const newAccountDetails = {
        account,
        balance,
        pinNumber,
        owner,
      };

      const accountService = new AccountService();
      const newaccount = await accountService.createAccount(newAccountDetails);
      //in Dev only
      return { client, newaccount, token };
    } catch (err) {
      return err;
    }
  }

  async signin(id) {
    try {
      const payload = { id: id };
      const token = await jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: 3600000,
      });
      return token;
    } catch (err) {
      return err;
    }
  }

  async createClient(data) {
    const {
      firstname,
      lastname,
      email,
      password,
      mobile,
      account,
      balance,
      pinNumber,
    } = data;

    const newClient = new this.ClientModel({
      firstname,
      lastname,
      email,
      password,
      mobile,
    });

    const client = await newClient.save();
    const owner = client._id;

    const newAccountDetails = {
      account,
      balance,
      pinNumber,
      owner,
    };

    const accountService = new AccountService();
    const newaccount = await accountService.createAccount(newAccountDetails);

    //in Dev only
    return { client, newaccount };
  }

  async getClient(clientId) {
    const client = await this.findById(clientId);

    console.log(client);
    return client;
  }
}
