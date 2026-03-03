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
} from "../validators/users.validator.js";
import {
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

// ************************
// SIGN UP
// ************************
router.post("/signup", authLimiter, validator(signUpSchema), signUp);

// ************************
// LOG IN
// ************************
router.post("/login", authLimiter, validator(loginSchema), logIn);

// ************************
// VERIFY EMAIL
// ************************
router.get("/verifyemail/:verificationToken", emailActionLimiter, verifyEmail);

// ************************
// RESEND VERIFICATION
// ************************
router.get(
  "/resendemailverification",
  emailActionLimiter,
  validator(resendVerificationSchema),
  resendEmailVerification,
);

// ************************
// FORGOT PASSWORD
// ************************
router.post(
  "/forgotpassword",
  emailActionLimiter,
  validator(forgotPasswordSchema),
  forgotPassword,
);

// ************************
// RESET PASSWORD
// ************************
router.patch(
  "/resetpassword/:resetToken",
  validator(resetPasswordSchema),
  resetPassword,
);

// ************************
// CHANGE PASSWORD
// ************************
// router.patch(
//   "/changepassword",
//   changePasswordLimiter,
//   validator(changePasswordSchema),
//   protect,
//   changePassword,
// );

// // ************************
// // CHANGE EMAIL
// // ************************
// router.patch(
//   "/changeemail",
//   changeEmailLimiter,
//   validator(changeEmailSchema),
//   changeEmail,
// );

export default router;
