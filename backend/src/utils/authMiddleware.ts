import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  } else {
    const token = authHeader.split(" ")[1];
    if (!token) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    } else {
      jwt.verify(token, process.env.JWT_SECRET!, (err) => {
        if (err) {
          return res.status(401).json({ error: "Unauthorized: Invalid token" });
        }
        next();
      });
    }
  }
};
