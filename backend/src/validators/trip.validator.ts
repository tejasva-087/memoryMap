import { z } from "zod";

const imageSchema = z.object({
  imageUrl: z
    .string({ error: "Please provide an image URL." })
    .trim()
    .url({ message: "Please enter a valid image URL." }),

  caption: z
    .string()
    .trim()
    .max(255, { message: "Caption must be under 255 characters." })
    .optional(),
});

export const createTripSchema = z
  .object({
    flag: z
      .string()
      .trim()
      .url({ message: "Please enter a valid flag image URL." })
      .max(255, { message: "Flag URL must be under 255 characters." })
      .optional(),

    country: z
      .string({ error: "Please enter the country you visited." })
      .trim()
      .min(1, { message: "Country name cannot be empty." })
      .max(255, { message: "Country name must be under 255 characters." }),

    place: z
      .string({ error: "Please enter the place you visited." })
      .trim()
      .min(1, { message: "Place name cannot be empty." })
      .max(255, { message: "Place name must be under 255 characters." }),

    latitude: z.coerce
      .number({ error: "Please provide a valid latitude." })
      .min(-90, { message: "Latitude must be between -90 and 90." })
      .max(90, { message: "Latitude must be between -90 and 90." }),

    longitude: z.coerce
      .number({ error: "Please provide a valid longitude." })
      .min(-180, { message: "Longitude must be between -180 and 180." })
      .max(180, { message: "Longitude must be between -180 and 180." }),

    startDate: z.coerce.date({
      error: "Please provide a valid start date.",
    }),

    endDate: z.coerce.date({
      error: "Please provide a valid end date.",
    }),

    description: z
      .string({ error: "Please write a description of your trip." })
      .trim()
      .min(1, { message: "Description cannot be empty." })
      .max(2000, { message: "Description must be under 2000 characters." }),
  })
  .refine((data) => data.endDate >= data.startDate, {
    message: "End date must be after the start date.",
    path: ["endDate"],
  });
