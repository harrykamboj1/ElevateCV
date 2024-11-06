import { Request, Response } from "express";
import prisma from "../../utils/prisma";
import { INTERNAL_SERVER_ERROR } from "../../constants/constant";
import { loginSchema, registrationSchema } from "../../schema";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { z } from "zod";

export const register = async (req: Request, res: Response) => {
  try {
    const parsedData = registrationSchema.parse(req.body);
    if (parsedData != null) {
      const { email, password } = parsedData;

      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        return res.status(400).json({ message: "User Already Exists" });
      }
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await prisma.user.create({
        data: { email, password: hashedPassword },
      });

      res.status(201).json({ message: "User registered successfully" });
    } else {
      console.log("Fail to Receive Request");
      return res.status(400).json({ message: "Fail to receive request" });
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
      expiresIn: "1h",
    });

    res.json({ token });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ errors: error.errors });
    }
    return res.status(500).json({ message: INTERNAL_SERVER_ERROR });
  }
};
