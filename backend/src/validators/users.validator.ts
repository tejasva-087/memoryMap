import { isStrongPassword } from "validator";
import { z } from "zod";

export const signUpSchema = z.object({
  firstName: z
    .string()
    .nonempty("First name is required")
    .min(2, "First name must be at least 2 characters")
    .trim()
    .transform((str) => str[0].toUpperCase() + str.slice(1).toLowerCase()),
  lastName: z
    .string()
    .nonempty("Last name is required")
    .min(2, "Last name must be at least 2 characters"),
  email: z.email("Invalid email format").nonempty("Email is required"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .refine(
      isStrongPassword,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
    )
    .nonempty("Password is required"),
});

export type SignUpInput = z.infer<typeof signUpSchema>;
