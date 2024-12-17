import { Request, response, Response } from "express";
import {
  EMPTY_SPACE,
  Fail,
  INTERNAL_SERVER_ERROR,
} from "../../constants/constant";
import { createResumeSchema } from "../../schema";
import prisma from "../../utils/prisma";
import { v4 as uuid } from "uuid";

export const createResume = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.split(EMPTY_SPACE)[1];
    if (!token) return res.status(401).json({ error: "Unauthorized" });
    // const parseData = createResumeSchema.parse(req.body);
    // const { email, title } = parseData;
    const {
      email,
      title,
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

    const existingResume = await prisma.resume.findUnique({
      where: { title },
    });
    if (existingResume)
      return res
        .status(200)
        .json({ message: "Resume with Title Already Exists", errorCode: "-1" });
    const resume = await prisma.resume.create({
      data: {
        title,
        userId: user.id,
        email: user.email,
        PersonalDetails: {
          create: {
            firstName: personal.firstName,
            lastName: personal.lastName,
            phone: personal.phone,
            email: personal.email,
            github: personal.github,
            portfolio: personal.portfolio,
            linkedin: personal.linkedin,
          },
        },
        Education: {
          create: [],
        },
        Experience: {
          create: [],
        },
        Projects: {
          create: [],
        },
        Skills: {
          create: {
            languages: skills.languages,
            frameworks: skills.frameworks,
            developerTools: skills.developerTools,
          },
        },
        SectionOrder: {
          create: {
            order: sectionOrder,
          },
        },
      },
      include: {
        user: true,
        PersonalDetails: true,
        Education: true,
        Experience: true,
        Projects: true,
        Skills: true,
        SectionOrder: true,
      },
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
      where: { resumeId: resumeId, userId: user!.id },
      include: {
        SectionOrder: true,
        Education: true,
        PersonalDetails: true,
        Skills: true,
        Experience: true,
        Projects: true,
      },
    });
    if (!resume)
      return res
        .status(200)
        .json({ message: "No Resume Found", errorCode: Fail });
    console.log(resume);
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
      include: {
        Education: true,
        Experience: true,
        Projects: true,
      },
    });
    if (!resume)
      return res
        .status(200)
        .json({ message: "No Resume Found", errorCode: Fail });

    const pendingResp = await updateResumeData(
      resumeId,
      projects,
      experience,
      education
    );

    const response = await prisma.resume.update({
      where: {
        resumeId,
        userId: user!.id,
      },
      data: {
        PersonalDetails: {
          update: {
            firstName: personal.firstName || "",
            lastName: personal.lastName || "",
            phone: personal.phone || "",
            email: personal.email || "",
            github: personal.github || "",
            portfolio: personal.portfolio || "",
            linkedin: personal.linkedin || "",
          },
        },

        Skills: {
          update: {
            languages: skills.languages || [],
            frameworks: skills.frameworks || [],
            developerTools: skills.developerTools || [],
          },
        },
        SectionOrder: {
          update: {
            order: sectionOrder || [],
          },
        },
      },
      include: {
        user: true,
      },
    });

    return res.status(200).json({
      message: "Data Saved Successfully",
      errorCode: "1",
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: INTERNAL_SERVER_ERROR });
  }
};

const updateResumeData = async (
  resumeId: string,
  projects: any,
  experience: any,
  education: any
) => {
  try {
    await updateProjects(resumeId, projects);
    await updateExperience(resumeId, experience);
    await updateEducation(resumeId, education);

    return { success: true, message: "Resume updated successfully" };
  } catch (error) {
    console.error("Error updating resume:", error);
    throw new Error("Failed to update resume");
  }
};

const updateExperience = async (resumeId: string, experience: any[]) => {
  try {
    console.log(experience);
    const existingExperience = await prisma.experience.findMany({
      where: { resumeResumeId: resumeId },
    });

    const existingExpIds = existingExperience.map((project) => project.id);
    const incomingExpIds = experience.map((exp) => exp.id).filter(Boolean);

    const expToUpdate = experience.filter((exp) =>
      existingExpIds.includes(exp.id)
    );

    const expToCreate = experience.filter((exp) => !exp.id);

    const expToDelete = existingExperience.filter(
      (project) => !incomingExpIds.includes(project.id)
    );

    const updatePromises = expToUpdate.map((exp) =>
      prisma.experience.update({
        where: { id: exp.id, resumeResumeId: resumeId },
        data: {
          company: exp.company,
          isPresent: exp.isPresent,
          location: exp.location,
          position: exp.position,
          responsibilities: exp.responsibilities,
          startDate: exp.startDate,
          endDate: exp.endDate,
        },
      })
    );

    const createPromises = expToCreate.map((exp) =>
      prisma.experience.create({
        data: {
          id: uuid(),
          resumeResumeId: resumeId,
          company: exp.company,
          isPresent: exp.isPresent,
          location: exp.location,
          position: exp.position,
          responsibilities: exp.responsibilities,
          startDate: exp.startDate,
          endDate: exp.endDate,
        },
      })
    );

    const deletePromises = expToDelete.map((exp) =>
      prisma.experience.delete({
        where: { id: exp.id, resumeResumeId: resumeId },
      })
    );

    // Step 4: Execute all operations
    await Promise.all([
      ...updatePromises,
      ...createPromises,
      ...deletePromises,
    ]);
  } catch (e) {
    console.log("Error in updateExperience :: " + e);
  }
};

const updateProjects = async (resumeId: string, projects: any[]) => {
  try {
    const existingProjects = await prisma.projects.findMany({
      where: { resumeResumeId: resumeId },
    });

    const existingProjectIds = existingProjects.map((project) => project.id);

    const incomingProjectIds = projects
      .map((project) => project.id)
      .filter(Boolean);

    // Projects to update (present in both incoming data and DB)
    const projectsToUpdate = projects.filter((project) =>
      existingProjectIds.includes(project.id)
    );
    // Projects to create (no `id` present in incoming data)
    const projectsToCreate = projects.filter(
      (project) => !projectsToUpdate.includes(project.id)
    );
    // Projects to delete (in DB but not in incoming data)
    const projectsToDelete = existingProjects.filter(
      (project) => !incomingProjectIds.includes(project.id)
    );

    const updatePromises = projectsToUpdate.map((project) =>
      prisma.projects.update({
        where: { id: project.id, resumeResumeId: resumeId },
        data: {
          title: project.title,
          description: project.description,
          startDate: project.startDate,
          endDate: project.endDate,
          techStack: project.techStack,
        },
      })
    );

    const createPromises = projectsToCreate.map((project) =>
      prisma.projects.create({
        data: {
          id: uuid(),
          resumeResumeId: resumeId,
          title: project.title,
          description: project.description,
          startDate: project.startDate,
          endDate: project.endDate,
          techStack: project.techStack,
        },
      })
    );

    const deletePromises = projectsToDelete.map((project) =>
      prisma.projects.delete({
        where: { id: project.id, resumeResumeId: resumeId },
      })
    );

    // Step 4: Execute all operations
    await Promise.all([
      ...updatePromises,
      ...createPromises,
      ...deletePromises,
    ]);
  } catch (e) {
    console.log("Error in updateProjects :: " + e);
  }
};

const updateEducation = async (resumeId: string, education: any[]) => {
  try {
    // Step 1: Fetch existing education records from the database
    const existingEducation = await prisma.education.findMany({
      where: { resumeResumeId: resumeId },
    });

    // Step 2: Separate education entries into actions
    const existingEducationIds = existingEducation.map((edu) => edu.id);
    const incomingEducationIds = education.map((edu) => edu.id).filter(Boolean);

    // Education to update (present in both incoming data and DB)
    const educationToUpdate = education.filter((edu) =>
      existingEducationIds.includes(edu.id)
    );

    // Education to create (no `id` present in incoming data)
    const educationToCreate = education.filter((edu) => !edu.id);

    // Education to delete (in DB but not in incoming data)
    const educationToDelete = existingEducation.filter(
      (edu) => !incomingEducationIds.includes(edu.id)
    );

    // Step 3: Perform database operations
    const updatePromises = educationToUpdate.map((edu) =>
      prisma.education.update({
        where: { id: edu.id, resumeResumeId: resumeId },
        data: {
          institution: edu.institution,
          degree: edu.degree,
          graduationYear: edu.graduationYear,
          location: edu.location,
        },
      })
    );

    const createPromises = educationToCreate.map((edu) =>
      prisma.education.create({
        data: {
          id: uuid(),
          resumeResumeId: resumeId,
          institution: edu.institution,
          degree: edu.degree,
          graduationYear: edu.graduationYear,
          location: edu.location,
        },
      })
    );

    const deletePromises = educationToDelete.map((edu) =>
      prisma.education.delete({
        where: { id: edu.id, resumeResumeId: resumeId },
      })
    );

    // Step 4: Execute all operations
    await Promise.all([
      ...updatePromises,
      ...createPromises,
      ...deletePromises,
    ]);

    return { success: true, message: "Education updated successfully" };
  } catch (error) {
    console.error("Error updating education:", error);
    throw new Error("Failed to update education");
  }
};
