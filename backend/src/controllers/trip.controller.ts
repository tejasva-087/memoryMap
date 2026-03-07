import { NextFunction, Request, Response } from "express";

import { differenceInDays } from "date-fns";

import { db } from "../server";
import catchAsync from "../utils/catchAsync";
import { tripTable } from "../schemas/trip.schema";

import { compressImage, compressImages } from "../utils/compressImage";
import AppError from "../utils/appError";
import { uploadMultipleImages } from "../services/storage.service";

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
  const buffers = await compressImages(images);

  // const imageKeys = await uploadMultipleImages(buffers, userId);

  // const [trip] = await db
  //   .insert(tripTable)
  //   .values({
  //     ...tripData,
  //     startDate,
  //     endDate,
  //     duration,
  //     imageKeys,
  //   })
  //   .returning();

  // res.status(201).json({
  //   status: "success",
  //   data: {
  //     ...trip,
  //   },
  // });
});
