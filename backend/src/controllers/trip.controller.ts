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
  uploadMultipleImages,
} from "../services/storage.service";
import { desc, eq, inArray } from "drizzle-orm";

interface ImageObj {
  id: string;
  tripId?: string;
  imageKey: string;
  caption: string | null;
  orderIndex: number | null;
}
async function getSignedImagesObj(imgObj: ImageObj[]) {
  return await Promise.all(
    imgObj.map(async (image) => {
      const { imageKey, ...metadata } = image;
      const signedUrl = await getSignedImageUrl(imageKey);
      return { ...metadata, imageUrl: signedUrl };
    }),
  );
}

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
          .returning();

        return { trip, tripImages };
      });

      const signedTripImages = await getSignedImagesObj(tripImages);

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
      const signedImages = await getSignedImagesObj(images);

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

    try {
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
    } catch (err) {
      next(err);
    }
  },
);

export const updateTrip = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user!.id;
    const tripId = req.params.id as string;

    const { deletedImages, metadata, ...data } = req.body;
    const newImagesFiles = req.files as Express.Multer.File[];
    const imageMetaData = metadata ? JSON.parse(metadata) : [];

    if (!tripId) {
      return next(new AppError("Please provide trip id.", 400));
    }

    try {
      await db.transaction(async (tx) => {
        // 1. Delete images
        if (deletedImages?.length) {
          const deletedImageKeys = await tx
            .delete(imageTable)
            .where(inArray(imageTable.id, deletedImages))
            .returning({ imageKey: imageTable.imageKey });

          await deleteMultipleImages(
            deletedImageKeys.map((obj) => obj.imageKey),
          );
        }

        // 2. Upload new images
        if (newImagesFiles?.length) {
          const buffer = await compressImages(newImagesFiles);
          const imageKeys = await uploadMultipleImages(buffer, userId, "trip");

          await tx.insert(imageTable).values(
            imageKeys.map((imageKey, index) => ({
              tripId: tripId,
              imageKey,
              orderIndex: imageMetaData[index]?.orderIndex ?? index,
              caption: imageMetaData[index]?.caption ?? null,
            })),
          );
        }

        // 3. Update trip info
        if (Object.keys(data).length > 0) {
          await tx
            .update(tripTable)
            .set({ ...data, updatedAt: new Date() })
            .where(eq(tripTable.id, tripId));
        }
      });

      // 4. etch updated trip
      const [trip] = await db
        .select()
        .from(tripTable)
        .where(eq(tripTable.id, tripId));

      if (!trip) {
        return next(new AppError("Trip not found", 404));
      }

      const tripImages = await db
        .select({
          id: imageTable.id,
          imageKey: imageTable.imageKey,
          caption: imageTable.caption,
          orderIndex: imageTable.orderIndex,
        })
        .from(imageTable)
        .where(eq(imageTable.tripId, tripId));

      const signedTripImages = await getSignedImagesObj(tripImages);

      res.status(200).json({
        status: "success",
        data: {
          trip: { ...trip, images: signedTripImages },
        },
      });
    } catch (err) {
      next(err);
    }
  },
);

export const getSignedImages = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const tripId = req.params.id;

    if (!tripId) return next(new AppError("Please provide trip id.", 400));

    const tripImages = await db
      .select()
      .from(imageTable)
      .where(eq(imageTable.tripId, tripId as string));

    const signedImages = tripImages ? await getSignedImagesObj(tripImages) : [];

    res.status(200).json({
      status: "success",
      data: {
        images: signedImages,
      },
    });
  },
);
