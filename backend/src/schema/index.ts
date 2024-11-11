import { z } from "zod";

export const registrationSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1),
  password: z.string().min(6),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const createResumeSchema = z.object({
  title: z.string().min(1),
  email: z.string().email(),
  // userId: z.number().min(1),
  // id: z.string().uuid(),
});
