import { Router } from "express";
const router = Router();

import { messageService } from "../../../../services";
import auth from "../../../../middleware/auth";

/**
 * Add new message
 * @param {*} req Express req Object
 * @param {*} res  Express res Object
 * @param {*} next  Express next Function
 */
router.post("/v1/messages/add", auth, async (req, res) => {
  const { text, author, authortype, sessionId } = req.body;

  const message = await messageService.newMessage(
    text,
    author,
    authortype,
    sessionId
  );
  res.json(message);
});

export { router as addMessage };
