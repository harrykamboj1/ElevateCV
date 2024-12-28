import { Request, Response } from "express";
import prisma from "../../utils/prisma";
import { EMPTY_SPACE, INTERNAL_SERVER_ERROR } from "../../constants/constant";
import { loginSchema, registrationSchema } from "../../schema";
import bcrypt from "bcryptjs";
import jwt, { JwtPayload } from "jsonwebtoken";
import { z } from "zod";

export const register = async (req: Request, res: Response) => {
  try {
    const parsedData = registrationSchema.parse(req.body);
    if (parsedData != null) {
      const { email, password, name } = parsedData;

      const existingUser = await prisma.user.findUnique({
        where: { email },
      });
      if (existingUser) {
        return res
          .status(200)
          .json({ message: "User Already Exists", errorCode: "-1" });
      }
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await prisma.user.create({
        data: { email, password: hashedPassword, name },
      });

      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
        expiresIn: process.env.SESSION_EXPIRE || "1h",
      });

      res.status(200).json({
        message: "User registered successfully",
        token,
        errorCode: "1",
      });
    } else {
      console.log("Fail to Receive Request");
      return res
        .status(200)
        .json({ message: "Fail to receive request", errorCode: "-1" });
    }
  } catch (error) {
    console.log("Error in auth register :: " + error);
    if (error instanceof z.ZodError) {
      return res.status(400).json({ errors: error.errors });
    }
    return res.status(500).json({ message: INTERNAL_SERVER_ERROR });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const parsedData = loginSchema.parse(req.body);
    const { email, password } = parsedData;

    // Find user by email
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user)
      return res
        .status(200)
        .json({ message: "Invalid email or password", errorCode: "-1" });

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res
        .status(200)
        .json({ message: "Invalid email or password", errorCode: "-1" });

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
      expiresIn: process.env.SESSION_EXPIRE || "1h",
    });

    res.json({ token, message: "Login Successfully", errorCode: "1" });
  } catch (error) {
    console.log(error);
    if (error instanceof z.ZodError) {
      return res.status(400).json({ errors: error.errors });
    }
    return res.status(500).json({ message: INTERNAL_SERVER_ERROR });
  }
};

export const checkSession = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.split(EMPTY_SPACE)[1];
    if (!token) return res.status(401).json({ error: "Unauthorized" });
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json({
      userId: user.id,
      email: user.email,
      name: user.name,
      aiUsageCount: user.aiUsageCount,
      lastAiUsageDate: user.lastAiUsageDate,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: e });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.split(EMPTY_SPACE)[1];
    if (!token) return res.status(401).json({ error: "Unauthorized" });
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    console.log(decoded);
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    await prisma.user.delete({
      where: { id: user.id },
    });

    res
      .status(200)
      .json({ message: "User deleted successfully", errorCode: "1" });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: e });
  }
};

export const aiCountCheck = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.split(EMPTY_SPACE)[1];
    if (!token) return res.status(401).json({ error: "Unauthorized" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    });
    if (!user) {
      return res
        .status(200)
        .json({ message: "User not found", errorCode: "-1" });
    }

    const today = new Date().toISOString().slice(0, 10);

    const lastUsageDate = user.lastAiUsageDate
      ? new Date(user.lastAiUsageDate).toISOString().slice(0, 10)
      : null;

    if (!lastUsageDate || lastUsageDate !== today) {
      user.aiUsageCount = 0;
      user.lastAiUsageDate = new Date(today);
    }
    console.log(user.aiUsageCount);
    if (
      user.aiUsageCount >=
      (process.env.AI_COUNT_LIMIT !== ""
        ? Number(process.env.AI_COUNT_LIMIT!)
        : 5)
    ) {
      return res.status(200).json({
        message: "You have reached your daily usage limit. Try again tomorrow.",
        errorCode: "-1",
      });
    }

    await prisma.user.update({
      where: { id: user.id },
      data: {
        aiUsageCount: (user.aiUsageCount += 1),
        lastAiUsageDate: new Date(),
      },
    });

    return res.status(200).json({
      message: "Submit Successfully",
      errorCode: "1",
    });
  } catch (e) {
    console.log(e);
    res.status(200).json({ message: "Something went wrong", errorCode: "-1" });
  }
};
