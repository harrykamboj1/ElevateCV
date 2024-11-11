import express from "express";
import { createResume } from "./controllers";
const router = express.Router();

router.post("/create", createResume as any);

export default router;
