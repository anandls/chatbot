import { Router } from "express";
const router = Router();

import { accountService } from "../../../../services";

router.get("/v1/accounts/add", async (req, res) => {
  try {
    const data = {
      account: "14524505445621121",
      balance: 1001,
      pinNumber: 1255,
    };

    const account = await accountService.createAccount(data);
    res.json(account);
  } catch (err) {
    if (err) return res.status(500).json({ msg: err });
  }
});

export { router as addAccount };
