import passport from "passport";
import { isStrongPassword } from "validator";
import { email, z } from "zod";

const nameSchema = z
  .string()
  .min(2, { message: "First name must be at least 2 characters" });

const emailSchema = z.string().email({ message: "Invalid email format" });

const strongPasswordSchema = z
  .string()
  .min(8, { message: "Password must be at least 8 characters" })
  .refine(isStrongPassword, {
    message:
      "Password must contain uppercase, lowercase, number and special character",
  });

export const signUpSchema = z.object({
  userName: nameSchema,
  email: emailSchema,
  password: strongPasswordSchema,
});

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, { message: "Password is required" }),
});

export const forgotPasswordSchema = z.object({
  email: emailSchema,
});

export const resetPasswordSchema = z.object({
  newPassword: strongPasswordSchema,
});
