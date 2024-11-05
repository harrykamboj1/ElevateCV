import express, { Request, Response } from "express";
import { loginUser, register } from "./controllers";

const router = express.Router();

router.post("/login", loginUser as any);

router.post("/register", register as any);

export default router;
