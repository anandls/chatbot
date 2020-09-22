import { Router } from "express";
const router = Router();

import { accountService } from "../../../../services";
import auth from "../../../../middleware/auth";

router.get("/v1/accounts/get", auth, async (req, res) => {
  try {
    const clientId = req.body.clientId;
    const account = await accountService.getAccount(clientId);

    if (account) {
      res.json(account);
    } else {
      res.status(401).json({ message: "An error occurred" });
    }
  } catch (err) {
    if (err) return res.status(500).json({ messages: err });
  }
});

export { router as getAccount };
