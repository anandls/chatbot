import { Router } from "express";
const router = Router();

import { clientService } from "../../../../services";

/**
 * Add new client and open a bank account
 * @param {*} req Express req Object
 * @param {*} res  Express res Object
 * @param {*} next  Express next Function
 */
router.post("/v1/clients/add", async (req, res) => {
  try {
    const {
      firstname,
      lastname,
      email,
      password,
      mobile,
      account,
      balance,
      pinNumber,
    } = req.body;

    const newclientData = {
      firstname,
      lastname,
      email,
      password,
      mobile,
      account,
      balance,
      pinNumber,
    };

    const clientExists = await clientService.findByEmail(email);

    if (!clientExists) {
      const client = await clientService.signup(newclientData);
      res.json(client);
    } else {
      res
        .status(409)
        .json({ message: "The email already exists, please try again." });
    }
  } catch (err) {
    if (err) return res.status(500).json({ message: message });
  }
});

export { router as addClient };
