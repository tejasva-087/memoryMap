import express from "express";
import validator from "../validators/validator";
import { createTripSchema } from "../validators/trip.validator";
import { protect } from "../controllers/auth.controller";
import { createTrip } from "../controllers/trip.controller";
import multer from "multer";

const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });
router
  .route("/")
  .post(
    protect,
    upload.array("images", 10),
    validator(createTripSchema),
    createTrip,
  );

export default router;
