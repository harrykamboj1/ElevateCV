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
      return res.status(400).json({ message: "Invalid email or password" });

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid email or password" });

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
      expiresIn: process.env.SESSION_EXPIRE || "1h",
    });

    res.json({ token });
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
    res.status(200).json({ userId: user.id, email: user.email });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: e });
  }
};
