import express from "express";
import validator from "../validators/validator";
import {
  createTripSchema,
  updateTripSchema,
} from "../validators/trip.validator";
import { protect } from "../controllers/auth.controller";
import {
  createTrip,
  deleteTrip,
  getAllTrips,
  getTrip,
  updateTrip,
} from "../controllers/trip.controller";
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
  )
  .get(protect, getAllTrips);

router
  .route("/:id")
  .get(protect, getTrip)
  .delete(protect, deleteTrip)
  .patch(
    protect,
    upload.array("newImages", 10),
    validator(updateTripSchema),
    updateTrip,
  );

export default router;
