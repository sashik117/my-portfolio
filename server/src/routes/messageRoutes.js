import { Router } from "express";
import {
  createMessage,
  deleteMessage,
  getMessages,
  markMessageRead
} from "../controllers/messageController.js";
import { requireAuth } from "../middleware/auth.js";

const router = Router();

router.post("/", createMessage);
router.get("/", requireAuth, getMessages);
router.patch("/:id/read", requireAuth, markMessageRead);
router.delete("/:id", requireAuth, deleteMessage);

export default router;
