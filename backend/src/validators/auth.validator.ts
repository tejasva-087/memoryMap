import { isStrongPassword } from "validator";
import { z } from "zod";

const nameSchema = z
  .string({ error: "Please enter your name." })
  .trim()
  .toLowerCase()
  .min(2, { message: "Name must be at least 2 characters." })
  .max(30, { message: "Name must be under 30 characters." })
  .regex(/^[A-Za-z]+(?: [A-Za-z]+)*$/, {
    message: "Name can only contain letters and spaces.",
  });

const emailSchema = z
  .string({ error: "Please enter your email address." })
  .trim()
  .toLowerCase()
  .email({ message: "Please enter a valid email address." });

const strongPasswordSchema = z
  .string({ error: "Please enter a password." })
  .min(8, { message: "Password must be at least 8 characters." })
  .max(128, { message: "Password must be under 128 characters." })
  .refine(
    (password) =>
      isStrongPassword(password, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      }),
    {
      message:
        "Password must include at least one uppercase letter, one lowercase letter, one number, and one symbol.",
    },
  );

export const signUpSchema = z.object({
  userName: nameSchema,
  email: emailSchema,
  password: strongPasswordSchema,
});

export const loginSchema = z.object({
  email: emailSchema,
  password: z
    .string({ error: "Please enter your password." })
    .trim()
    .min(1, { message: "Password cannot be empty." }),
});

export const forgotPasswordSchema = z.object({
  email: emailSchema,
});

export const resetPasswordSchema = z
  .object({
    newPassword: strongPasswordSchema,
    confirmPassword: z
      .string({ error: "Please confirm your password." })
      .trim()
      .min(1, { message: "Please confirm your password." }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export const resendVerificationSchema = z.object({
  email: emailSchema,
});

export const changePasswordSchema = z
  .object({
    password: z
      .string({ error: "Please enter your current password." })
      .trim()
      .min(1, { message: "Current password cannot be empty." }),

    newPassword: strongPasswordSchema,
  })
  .refine((data) => data.password !== data.newPassword, {
    message: "New password must be different from your current password.",
    path: ["newPassword"],
  });

export const changeEmailSchema = z.object({
  newEmail: emailSchema,
});
