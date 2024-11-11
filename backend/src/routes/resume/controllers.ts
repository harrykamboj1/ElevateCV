import { Request, Response } from "express";
import { EMPTY_SPACE, INTERNAL_SERVER_ERROR } from "../../constants/constant";
import { createResumeSchema } from "../../schema";
import prisma from "../../utils/prisma";

export const createResume = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.split(EMPTY_SPACE)[1];
    if (!token) return res.status(401).json({ error: "Unauthorized" });
    const parseData = createResumeSchema.parse(req.body);
    const { email, title } = parseData;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user)
      return res
        .status(200)
        .json({ message: "Invalid email or password", errorCode: "-1" });

    const existingResume = await prisma.resume.findUnique({
      where: { title },
    });
    if (existingResume)
      return res
        .status(200)
        .json({ message: "Resume with Title Already Exists", errorCode: "-1" });
    const resume = await prisma.resume.create({
      data: { title: title, userId: user.id, email: user.email },
      include: { user: true },
    });

    return res
      .status(200)
      .json({ message: "Resume created Successfully", errorCode: "1", resume });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: INTERNAL_SERVER_ERROR });
  }
};
