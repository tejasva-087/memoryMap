import express from "express";
import rateLimit from "express-rate-limit";

import validator from "../validators/validator";
import {
  loginSchema,
  signUpSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  resendVerificationSchema,
  changePasswordSchema,
  changeEmailSchema,
} from "../validators/auth.validator.js";
import {
  changeEmail,
  changePassword,
  forgotPassword,
  logIn,
  protect,
  resendEmailVerification,
  resetPassword,
  signUp,
  verifyEmail,
} from "../controllers/auth.controller.js";

const router = express.Router();

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100, // 5
  message: {
    status: "fail",
    message: "Too many authentication attempts. Try again later.",
  },
});
const emailActionLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100, // 5
  message: {
    status: "fail",
    message: "Too many email requests. Please wait.",
  },
});

const changePasswordLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100, // 3
  message: {
    status: "fail",
    message: "Too many password change attempts. Try again later.",
  },
});

const changeEmailLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100, // 3
  message: {
    status: "fail",
    message: "Too many email change attempts. Try again later.",
  },
});

router.post("/signUp", authLimiter, validator(signUpSchema), signUp);
router.post("/logIn", authLimiter, validator(loginSchema), logIn);

router.get("/verifyemail/:verificationToken", emailActionLimiter, verifyEmail);
router.get(
  "/resendEmailVerification",
  emailActionLimiter,
  validator(resendVerificationSchema),
  resendEmailVerification,
);

router.post(
  "/forgotPassword",
  emailActionLimiter,
  validator(forgotPasswordSchema),
  forgotPassword,
);
router.patch(
  "/resetPassword/:resetToken",
  validator(resetPasswordSchema),
  resetPassword,
);

router.patch(
  "/changePassword",
  changePasswordLimiter,
  validator(changePasswordSchema),
  protect,
  changePassword,
);
router.patch(
  "/changeEmail",
  changeEmailLimiter,
  validator(changeEmailSchema),
  protect,
  changeEmail,
);

export default router;
