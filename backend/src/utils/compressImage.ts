import sharp from "sharp";
import AppError from "../utils/appError";

export const compressImage = async (
  file: Express.Multer.File,
): Promise<Buffer> => {
  if (!file.mimetype.startsWith("image/")) {
    throw new AppError("Only image files are allowed.", 400);
  }

  const buffer = await sharp(file.buffer)
    .rotate() // fix phone orientation
    .resize({
      width: 1600,
      withoutEnlargement: true,
    })
    .webp({
      quality: 80,
      effort: 6,
    })
    .toBuffer();

  return buffer;
};

export const compressImages = async (files: Express.Multer.File[]) => {
  return Promise.all(files.map(compressImage));
};
