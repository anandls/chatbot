import { Router } from "express";
const router = Router();

import { clientService } from "../../../../services";

/**
 * Client sign up and initial deposit
 * @param {*} req Express req Object
 * @param {*} res  Express res Object
 * @param {*} next  Express next Function
 */
router.post("/v1/clients/signup", async (req, res) => {
  try {
    //add validation
    const {
      firstname,
      lastname,
      email,
      password,
      mobile,
      account,
      balance,
    } = req.body;

    let pinNumber = "1234";

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
    if (err) return res.status(500).json({ message: err });
  }
});

router.post("/v1/clients/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    const clientExists = await clientService.findByEmail(email);
    /*
    The account was not found
    */
    if (!clientExists) {
      return res.status(400).json({
        message:
          "Sorry, the account was not found, please check the email address and password entered.",
      });

      /*
    The account was found, check password
    */
    } else {
      const verifyPassword = await clientService.verifyPassword(
        password,
        clientExists.password
      );

      if (verifyPassword) {
        const owner = clientExists.id;
        const token = await clientService.signin(owner);

        token
          ? res.status(201).json(token)
          : res.status(401).json({ message: "An error occurred signing in" });
      }
    }
  } catch (err) {
    if (err) return res.status(500).json({ message: err });
  }
});

export { router as authClient };
