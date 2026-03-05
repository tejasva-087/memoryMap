import express from "express";
import { protect } from "../controllers/auth.controller";
import {
  changeEmailSchema,
  changePasswordSchema,
} from "../validators/users.validator";
import validator from "../validators/validator";

const router = express.Router();

router.get("/:id");

router.post("/changePassword", validator(changePasswordSchema), protect);
router.post("/changeemail", validator(changeEmailSchema), protect);
