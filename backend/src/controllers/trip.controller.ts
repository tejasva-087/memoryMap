import { NextFunction, Request, Response } from "express";

import { db } from "../server";
import catchAsync from "../utils/catchAsync";
import { tripTable } from "../schemas/trip.schema";

import { compressImages } from "../utils/compressImage";
import AppError from "../utils/appError";

import { imageTable } from "../schemas/image.schema";
import {
  getSignedUrls,
  uploadMultipleImages,
} from "../services/storage.service";

export const createTrip = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user!.id;

    const images = req.files as Express.Multer.File[];
    if (!images || images.length === 0) {
      throw new AppError("Please upload at least one image.", 400);
    }
    const buffers = await compressImages(images);

    const { metadata, ...tripDetails } = req.body;
    const imageMetaData = JSON.parse(metadata);

    try {
      const imageKeys = await uploadMultipleImages(buffers, userId, "trip");

      const { trip, tripImages } = await db.transaction(async (tx) => {
        // Adding the trip details
        const [trip] = await tx
          .insert(tripTable)
          .values({
            userId,
            ...tripDetails,
          })
          .returning();

        const tripImages = await tx
          .insert(imageTable)
          .values(
            imageKeys.map((imageKey, index) => ({
              tripId: trip.id,
              imageKey,
              orderIndex: imageMetaData[index].orderIndex,
              caption: imageMetaData[index].caption,
            })),
          )
          .returning({
            id: imageTable.id,
            orderIndex: imageTable.orderIndex,
            caption: imageTable.caption,
          });

        return { trip, tripImages };
      });

      const imageUrls = await getSignedUrls(imageKeys);
      const signedTripImages = tripImages.map((img, i) => ({
        ...img,
        imageUrl: imageUrls[i],
      }));

      res.status(201).json({
        status: "success",
        data: { ...trip, images: signedTripImages },
      });
    } catch (err) {
      next(new AppError("Image upload failed", 500));
    }
  },
);
