import { NextFunction, Request, Response } from "express";

import { differenceInDays } from "date-fns";

import { db } from "../server";
import catchAsync from "../utils/catchAsync";
import { tripTable } from "../schemas/trip.schema";
import { tripImagesTable } from "../schemas/image.schema";
import { compressImage, compressImages } from "../utils/compressImage";
import AppError from "../utils/appError";
import { uploadTripImages } from "../services/storage.service";

function getTripDuration(start: Date, end: Date) {
  const days = differenceInDays(end, start);

  if (days < 7) return `${days} days`;
  if (days < 30) return `${Math.floor(days / 7)} weeks`;
  return `${Math.floor(days / 30)} months`;
}

export const createTrip = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user!.id;

  const { startDate, endDate, ...tripData } = req.body;
  const duration = getTripDuration(startDate, endDate);

  const images = req.files as Express.Multer.File[];
  if (!images || images.length === 0) {
    throw new AppError("Please upload at least one image.", 400);
  }
  const compressedImages = await compressImages(images);

  await uploadTripImages(compressedImages[0], userId);

  // creating a transaction so it will make sure al the queries are executed or else none is executed
  // const { trip, tripImages } = await db.transaction(async (tx) => {
  //   // Adding the trip details
  //   const [trip] = await tx
  //     .insert(tripTable)
  //     .values({
  //       userId,
  //       startDate,
  //       endDate,
  //       duration,
  //       ...tripData,
  //     })
  //     .returning();

  //   // Adding trip images
  //   const tripImages = await tx
  //     .insert(tripImagesTable)
  //     .values(
  //       images.map(
  //         (img: { imageUrl: string; caption?: string }, index: number) => ({
  //           tripId: trip.id,
  //           imageUrl: img.imageUrl,
  //           caption: img.caption,
  //           orderIndex: index,
  //         }),
  //       ),
  //     )
  //     .returning();

  //   return { trip, tripImages };
  // });

  // res.status(201).json({
  //   status: "success",
  //   data: {
  //     ...trip,
  //     images: tripImages,
  //   },
  // });
});
