import { randomUUID } from "crypto";
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand,
  DeleteObjectsCommand,
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

  const command = new PutObjectCommand({
    Bucket: process.env.R2_BUCKET!,
    Key: key,
    Body: buffer,
    ContentType: "image/webp",
  });
  await r2.send(command);

  return key;
};

export const getSignedImageUrl = async (key: string) => {
  const command = new GetObjectCommand({
    Bucket: process.env.R2_BUCKET!,
    Key: key,
  });

  const url = await getSignedUrl(r2, command, {
    expiresIn: 60 * 5,
  });

  return url;
};

export const deleteImage = async (key: string) => {
  await r2.send(
    new DeleteObjectCommand({
      Bucket: process.env.R2_BUCKET!,
      Key: key,
    }),
  );
};

export const uploadMultipleImages = async (
  buffers: Buffer[],
  id: string,
  label: string,
) => {
  const keys: string[] = [];

  try {
    await Promise.all(
      buffers.map(async (buffer) => {
        keys.push(await uploadImage(buffer, id, label));
      }),
    );
    return keys;
  } catch (err) {
    keys.map(async (key) => {
      await Promise.all(keys.map((key) => deleteImage(key)));
    });
    throw new AppError("Image upload failed", 500);
  }
};

export const deleteMultipleImages = async (keys: string[]) => {
  if (!keys.length) return;

  await r2.send(
    new DeleteObjectsCommand({
      Bucket: process.env.R2_BUCKET!,
      Delete: {
        Objects: keys.map((key) => ({ Key: key })),
      },
    }),
  );
};
