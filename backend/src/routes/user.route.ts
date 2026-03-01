import express from "express";
import rateLimit from "express-rate-limit";

import validator from "../validators/validator";
import {
  loginSchema,
  signUpSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  resendVerificationSchema,
} from "../validators/users.validator.js";
import {
  forgotPassword,
  logIn,
  resetPassword,
  signUp,
  verifyEmail,
} from "../controllers/auth.controller.js";

const router = express.Router();

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: {
    status: "fail",
    message: "Too many authentication attempts. Try again later.",
  },
});
const emailActionLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 3,
  message: {
    status: "fail",
    message: "Too many email requests. Please wait.",
  },
});

router.post("/signup", authLimiter, validator(signUpSchema), signUp);
router.post("/login", authLimiter, validator(loginSchema), logIn);

router.get("/verifyemail/:verificationToken", emailActionLimiter, verifyEmail);
router.get(
  "/resendVerificationToken/:verificationToken",
  emailActionLimiter,
  validator(resendVerificationSchema),
);
router.post(
  "/forgotpassword",
  emailActionLimiter,
  validator(forgotPasswordSchema),
  forgotPassword,
);
router.patch(
  "/resetpassword/:resetToken",
  validator(resetPasswordSchema),
  resetPassword,
);

export default router;
