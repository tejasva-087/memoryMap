import { randomUUID } from "crypto";
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectsCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import AppError from "../utils/appError";

export const r2 = new S3Client({
  region: "auto",
  endpoint: process.env.R2_ENDPOINT!,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY!,
    secretAccessKey: process.env.R2_SECRET_KEY!,
  },
});

export const uploadImage = async (
  buffer: Buffer,
  id: string,
  label: string,
) => {
  const key = `${label}/${id}/${randomUUID()}.webp`;
  await r2.send(
    new PutObjectCommand({
      Bucket: process.env.R2_BUCKET!,
      Key: key,
      Body: buffer,
      ContentType: "image/webp",
    }),
  );
  return key;
};

export const getSignedImageUrl = async (key: string) => {
  const command = new GetObjectCommand({
    Bucket: process.env.R2_BUCKET!,
    Key: key,
  });
  return await getSignedUrl(r2, command, { expiresIn: 60 * 5 });
};

export const deleteMultipleImages = async (keys: string[]) => {
  if (!keys.length) return;
  try {
    await r2.send(
      new DeleteObjectsCommand({
        Bucket: process.env.R2_BUCKET!,
        Delete: {
          Objects: keys.map((key) => ({ Key: key })),
        },
      }),
    );
  } catch (err) {
    throw new AppError("There was an error deleting data.", 500);
  }
};

export const uploadMultipleImages = async (
  buffers: Buffer[],
  id: string,
  label: string,
) => {
  let keys: string[] = [];
  try {
    return await Promise.all(
      buffers.map((buffer) => uploadImage(buffer, id, label)),
    );
  } catch (err) {
    await deleteMultipleImages(keys);
    throw new AppError("There was an error uploading images.", 500);
  }
};

export const getSignedUrls = async (keys: string[]) => {
  try {
    return Promise.all(keys.map((key) => getSignedImageUrl(key)));
  } catch (err) {
    throw new AppError("There was an error fetching images.", 500);
  }
};
