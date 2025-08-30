import express from "express";
import {
  createOrUpdateProfile,
  getProfile,
  getProjectsBySkill,
  getTopSkills,
  searchProfile,
  getProjectsByTitle,
  getProjectByTitle,
  addProject
} from "../controllers/profile.js";

const router = express.Router();

router.post("/", createOrUpdateProfile);
router.get("/", getProfile);
router.get("/projects", getProjectsBySkill);
router.get("/skills/top", getTopSkills);
router.get("/search", searchProfile);
router.get("/projects/title", getProjectsByTitle);
router.get("/project/:title", getProjectByTitle);
router.post("/projects", addProject);

export default router;
