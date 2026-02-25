import { isStrongPassword } from "validator";
import { z } from "zod";

const emailSchema = z.string().email({ message: "Invalid email format" });

const strongPasswordSchema = z
  .string()
  .min(8, { message: "Password must be at least 8 characters" })
  .refine(isStrongPassword, {
    message:
      "Password must contain uppercase, lowercase, number and special character",
  });

export const signUpSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: "First name must be at least 2 characters" }),
  lastName: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters" }),
  email: emailSchema,
  password: strongPasswordSchema,
});

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, { message: "Password is required" }),
});
