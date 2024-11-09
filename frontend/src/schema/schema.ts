import { z } from "zod";

export const signUpSchema = z.object({
  name: z.string().min(1, "Name must contain at least 1 character"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(7, "Password must be at least 7 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
});

export const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(7, "Password must be at least 7 characters"),
});

export type SignInSchema = z.infer<typeof signInSchema>;
export type SignUpSchema = z.infer<typeof signUpSchema>;
