import express from "express";
import validator from "../validators/validator";
import { createTripSchema } from "../validators/trip.validator";
import { protect } from "../controllers/auth.controller";
import { createTrip } from "../controllers/trip.controller";

const router = express.Router();

router.route("/").post(validator(createTripSchema), protect, createTrip);

export default router;

// {
//   id: 'faedc564-a9fd-409d-ad0d-6a9fc6338194',
//   userId: 'b3e608aa-7daa-43fc-aee1-0ab957d1fb45',
//   flag: null,
//   country: 'Japan',
//   place: 'Tokyo',
//   latitude: 35.6762,
//   longitude: 139.6503,
//   startDate: 2026-04-01T00:00:00.000Z,
//   endDate: 2026-04-10T00:00:00.000Z,
//   duration: null,
//   description: 'Cherry blossom trip',
//   createdAt: 2026-03-06T17:26:52.172Z,
//   updatedAt: 2026-03-06T17:26:52.172Z
// }
