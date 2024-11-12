import express from "express";
import {
  createResume,
  getAllResumeByUserId,
  getResumeById,
} from "./controllers";
const router = express.Router();

router.post("/create", createResume as any);
router.post("/getResumeById", getResumeById as any);
router.post("/getAllResumeByUserId", getAllResumeByUserId as any);

export default router;
