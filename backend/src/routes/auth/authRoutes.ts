import express, { Request, Response } from "express";
import { loginUser, register, checkSession, deleteUser } from "./controllers";

const router = express.Router();

router.post("/login", loginUser as any);

router.post("/register", register as any);

router.get("/session", checkSession as any);
router.post("/delete", deleteUser as any);

export default router;
