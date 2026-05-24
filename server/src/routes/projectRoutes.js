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

const router = Router();

router.get("/", getPublishedProjects);
router.get("/admin/all", requireAuth, getAllProjects);
router.get("/:id", getProject);
router.post("/", requireAuth, upload.single("image"), createProject);
router.patch("/:id", requireAuth, upload.single("image"), updateProject);
router.delete("/:id", requireAuth, deleteProject);

export default router;
