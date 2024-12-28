import express, { NextFunction, Request, Response } from "express";
import {
  createResume,
  getAllResumeByUserId,
  getResumeById,
  saveAllResumeData,
  deleteResumeById,
} from "./controllers";
import { authMiddleware } from "../../utils/authMiddleware";
const router = express.Router();

router.use(authMiddleware);
router.post("/create", createResume as any);
router.post("/getResumeById", getResumeById as any);
router.post("/getAllResumeByUserId", getAllResumeByUserId as any);
router.post("/saveAllData", saveAllResumeData as any);
router.post("/deleteResumeById", deleteResumeById as any);

export default router;
