import { z } from "zod";

const imageSchema = z.object({
  imageUrl: z.string().url(),
  caption: z.string().optional(),
});

export const createTripSchema = z
  .object({
    flag: z
      .string()
      .trim()
      .max(255, { message: "Flag must be less than 255 characters" })
      .optional(),
    country: z
      .string()
      .trim()
      .min(1, { message: "Country is required" })
      .max(255, { message: "Country must be less than 255 characters" }),
    place: z
      .string()
      .trim()
      .min(1, { message: "Place is required" })
      .max(255, { message: "Place must be less than 255 characters" }),
    latitude: z
      .number({ message: "Latitude must be a number" })
      .min(-90, { message: "Latitude must be greater than -90" })
      .max(90, { message: "Latitude must be less than 90" })
      .optional(),
    longitude: z
      .number({ message: "Longitude must be a number" })
      .min(-180, { message: "Longitude must be greater than -180" })
      .max(180, { message: "Longitude must be less than 180" })
      .optional(),
    startDate: z.coerce.date({
      message: "Invalid start date",
    }),
    endDate: z.coerce.date({
      message: "Invalid end date",
    }),
    description: z
      .string()
      .trim()
      .max(2000, { message: "Description too long" })
      .optional(),
    images: z.array(imageSchema).optional(),
  })
  .refine((data) => data.endDate >= data.startDate, {
    message: "End date must be after start date",
    path: ["endDate"],
  });
