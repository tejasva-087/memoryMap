import express from "express";

import validator from "../validators/validator";
import {
  loginSchema,
  signUpSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
} from "../validators/users.validator.js";
import {
  forgotPassword,
  logIn,
  resetPassword,
  signUp,
  verifyEmail,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", validator(signUpSchema), signUp);
router.post("/login", validator(loginSchema), logIn);
router.get("/verifyemail/:verificationToken", verifyEmail);
router.post("/forgotpassword", validator(forgotPasswordSchema), forgotPassword);
router.patch(
  "/resetpassword/:resetToken",
  validator(resetPasswordSchema),
  resetPassword,
);

export default router;
