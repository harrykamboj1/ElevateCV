import { Router } from "express";
import {
  saveEducationDetails,
  saveExperienceDetails,
  savePersonalDetails,
  saveProjectDetails,
  saveSkillsDetails,
} from "./controller";

const router = Router();

router.post("/savePersonalDetails", savePersonalDetails as any);
router.post("/saveExperienceDetails", saveExperienceDetails as any);
router.post("/saveEducationDetails", saveEducationDetails as any);
router.post("/saveSkillsDetails", saveSkillsDetails as any);
router.post("/saveProjectDetails", saveProjectDetails as any);

export default router;
