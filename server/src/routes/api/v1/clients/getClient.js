import { Router } from "express";
const router = Router();

import { clientService } from "../../../../services";
import auth from "../../../../middleware/auth";

router.get("/v1/clients/get", auth, async (req, res) => {
  try {
    const clientId = req.body.clientId;
    const client = await clientService.getClient(clientId);
    if (client) {
      res.json(client);
    } else {
      res.status(401).json({ message: "An error occurred" });
    }
  } catch (err) {
    console.log(err);
    if (err) return res.status(401).json({ message: err });
  }
});

router.get("/v1/clients/dashboard", auth, async (req, res) => {
  console.log("DASHBOARD");
  res.json("dashboard");
});

export { router as getClient };
