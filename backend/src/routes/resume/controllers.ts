import { Request, Response } from "express";
import {
  EMPTY_SPACE,
  Fail,
  INTERNAL_SERVER_ERROR,
} from "../../constants/constant";
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

export const getResumeById = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.split(EMPTY_SPACE)[1];
    if (!token) return res.status(401).json({ error: "Unauthorized" });
    const { email, resumeId } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user)
      return res
        .status(200)
        .json({ message: "Invalid email or password", errorCode: "-1" });

    const resume = await prisma.resume.findUnique({
      where: { resumeId: resumeId },
    });
    if (!resume)
      return res
        .status(200)
        .json({ message: "No Resume Found", errorCode: Fail });

    return res.status(200).json({ resume });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: INTERNAL_SERVER_ERROR });
  }
};

export const getAllResumeByUserId = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.split(EMPTY_SPACE)[1];
    if (!token) return res.status(401).json({ error: "Unauthorized" });
    const { email } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user)
      return res
        .status(200)
        .json({ message: "Invalid email or password", errorCode: "-1" });

    const resume = await prisma.resume.findMany({
      where: { email },
    });
    if (!resume)
      return res
        .status(200)
        .json({ message: "No Resume Found", errorCode: Fail });

    return res.status(200).json({ resume });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: INTERNAL_SERVER_ERROR });
  }
};

export const saveAllResumeData = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.split(EMPTY_SPACE)[1];
    if (!token) return res.status(401).json({ error: "Unauthorized" });
    const {
      email,
      resumeId,
      personal,
      projects,
      sectionOrder,
      experience,
      skills,
      education,
    } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user)
      return res
        .status(200)
        .json({ message: "Invalid email or password", errorCode: "-1" });

    const resume = await prisma.resume.findUnique({
      where: { email, resumeId },
    });
    if (!resume)
      return res
        .status(200)
        .json({ message: "No Resume Found", errorCode: Fail });

    const response = await prisma.resume.update({
      data: {
        resumeId,
        personalDetails: personal,
        education: education,
        experience: experience,
        projects: projects,
        sectionsOrder: sectionOrder,
        skills: skills,
        userId: user.id,
      },
      where: { resumeId, userId: user!.id },
      include: { user: true },
    });

    console.log(response);

    return res.status(200).json({
      message: "Data Saved Successfully",
      errorCode: "1",
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: INTERNAL_SERVER_ERROR });
  }
};
