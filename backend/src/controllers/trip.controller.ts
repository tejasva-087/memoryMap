import { NextFunction, Request, Response } from "express";

import { db } from "../server";
import catchAsync from "../utils/catchAsync";
import { tripTable } from "../schemas/trip.schema";

import { compressImages } from "../utils/compressImage";
import AppError from "../utils/appError";

import { imageTable } from "../schemas/image.schema";
import {
  deleteMultipleImages,
  getSignedImageUrl,
  getSignedUrls,
  uploadMultipleImages,
} from "../services/storage.service";
import { desc, eq } from "drizzle-orm";

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
      next(err);
    }
  },
);

export const getAllTrips = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id: userId } = req.user!;

    const trips = await db
      .select({
        id: tripTable.id,
        flag: tripTable.flag,
        country: tripTable.country,
        place: tripTable.place,
        startDate: tripTable.startDate,
        endDate: tripTable.endDate,
        longiTude: tripTable.longitude,
        latitude: tripTable.latitude,
        createdAt: tripTable.createdAt,
      })
      .from(tripTable)
      .orderBy(desc(tripTable.createdAt))
      .where(eq(tripTable.userId, userId));

    res.status(200).json({
      status: "success",
      data: {
        trips,
      },
    });
  },
);

export const getTrip = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id as string;

    const { trip, images } = await db.transaction(async (tx) => {
      const [trip] = await tx
        .select({
          id: tripTable.id,
          flag: tripTable.flag,
          country: tripTable.country,
          place: tripTable.place,
          startDate: tripTable.startDate,
          endDate: tripTable.endDate,
          longiTude: tripTable.longitude,
          latitude: tripTable.latitude,
          createdAt: tripTable.createdAt,
          description: tripTable.description,
        })
        .from(tripTable)
        .orderBy(desc(tripTable.createdAt))
        .where(eq(tripTable.id, id));

      const images = await tx
        .select({
          id: imageTable.id,
          imageKey: imageTable.imageKey,
          caption: imageTable.caption,
          orderIndex: imageTable.orderIndex,
        })
        .from(imageTable)
        .where(eq(imageTable.tripId, id));

      return { trip, images };
    });

    if (!trip) {
      return next(new AppError("No trip exist with the provided id", 400));
    }

    try {
      const signedImages = await Promise.all(
        images.map(async (image) => {
          const { imageKey, ...imageDetails } = image;
          const imageUrl = await getSignedImageUrl(imageKey);
          return { ...imageDetails, imageUrl };
        }),
      );

      res.status(200).json({
        status: "success",
        data: {
          trip: {
            ...trip,
            images: signedImages,
          },
        },
      });
    } catch (err) {
      next(err);
    }
  },
);

export const deleteTrip = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const tripId = req.params.id as string;

    const imageKeys = await db
      .select({ imageKey: imageTable.imageKey })
      .from(imageTable)
      .where(eq(imageTable.tripId, tripId));

    const keys = imageKeys.map((img) => img.imageKey);
    if (keys.length > 0) {
      await deleteMultipleImages(keys);
    }

    const deletedTrip = await db
      .delete(tripTable)
      .where(eq(tripTable.id, tripId))
      .returning({ id: tripTable.id });

    if (deletedTrip.length === 0) {
      return next(new AppError("There exists no trip with this id", 404));
    }

    res.status(200).json({
      message: "success",
      data: null,
    });
  },
);
