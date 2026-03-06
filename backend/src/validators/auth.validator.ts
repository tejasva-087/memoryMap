import { isStrongPassword } from "validator";
import { z } from "zod";

const nameSchema = z
  .string()
  .trim()
  .toLowerCase()
  .min(2, { message: "Name must be at least 2 characters" })
  .max(30, { message: "Name must be less than 30 characters" })
  .regex(/^[A-Za-z]+(?: [A-Za-z]+)*$/, {
    message: "Name can only contain letters and spaces",
  });

// const UserNameSchema = z
//   .string()
//   .trim()
//   .toLowerCase()
//   .min(2, { message: "Username must be at least 2 characters" })
//   .max(30, { message: "Username must be less than 30 characters" })
//   .regex(/^[a-zA-Z0-9_]+$/, {
//     message: "Username can only contain letters, numbers and underscores",
//   });

const emailSchema = z
  .string()
  .trim()
  .toLowerCase()
  .email({ message: "Invalid email format" });

const strongPasswordSchema = z
  .string()
  .min(8, { message: "Password must be at least 8 characters" })
  .max(128, { message: "Password too long" })
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
        "Password must contain at least 1 uppercase, 1 lowercase, 1 number, and 1 symbol",
    },
  );

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

export const resetPasswordSchema = z
  .object({
    newPassword: strongPasswordSchema,
    confirmPassword: z
      .string()
      .min(1, { message: "Please confirm your password" }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const resendVerificationSchema = z.object({
  email: emailSchema,
});

export const changePasswordSchema = z
  .object({
    password: strongPasswordSchema,
    newPassword: strongPasswordSchema,
  })
  .refine((data) => data.password !== data.newPassword, {
    message: "New password must be different from the old password",
    path: ["newPassword"],
  });

export const changeEmailSchema = z.object({
  newEmail: emailSchema,
});
