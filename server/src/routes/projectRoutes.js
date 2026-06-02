import { Router } from "express";
import {
  createProject,
  deleteProject,
  getAllProjects,
  getProject,
  getPublishedProjects,
  updateProject
} from "../controllers/projectController.js";
import { requireAuth } from "../middleware/auth.js";
import { upload } from "../middleware/upload.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const router = Router();

router.get("/", asyncHandler(getPublishedProjects));
router.get("/admin/all", requireAuth, asyncHandler(getAllProjects));
router.get("/:id", asyncHandler(getProject));
router.post("/", requireAuth, upload.single("image"), asyncHandler(createProject));
router.patch("/:id", requireAuth, upload.single("image"), asyncHandler(updateProject));
router.delete("/:id", requireAuth, asyncHandler(deleteProject));

export default router;
