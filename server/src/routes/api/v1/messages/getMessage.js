import { Router } from "express";
const router = Router();

import { messageService } from "../../../../services";
import auth from "../../../../middleware/auth";

/**
 * Get message by sessionId
 * @param {*} req Express req Object
 * @param {*} res  Express res Object
 * @param {*} next  Express next Function
 */
router.get("/v1/messages/get", async (req, res) => {
  const { sessionId } = req.body;

  const getMessage = await messageService.newMessage();
  res.json(getMessage);
});

export { router as getMessage };
