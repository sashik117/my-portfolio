import { Router } from "express";
import {
  createMessage,
  deleteMessage,
  getMessages,
  markMessageRead
} from "../controllers/messageController.js";
import { requireAuth } from "../middleware/auth.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = Router();

router.post("/", asyncHandler(createMessage));
router.get("/", requireAuth, asyncHandler(getMessages));
router.patch("/:id/read", requireAuth, asyncHandler(markMessageRead));
router.delete("/:id", requireAuth, asyncHandler(deleteMessage));

export default router;
