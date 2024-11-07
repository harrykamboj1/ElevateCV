import express, { Request, Response } from "express";
import { loginUser, register, checkSession } from "./controllers";

const router = express.Router();

router.post("/login", loginUser as any);

router.post("/register", register as any);

router.post("/session", checkSession as any);

export default router;
