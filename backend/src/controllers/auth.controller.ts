import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";

import {
  authenticateUser,
  authorize,
  changeEmailAuthorized,
  changePasswordAuthorized,
  createUser,
  generatePasswordResetToken,
  resendVerificationEmail,
  updatePassword,
  verifyEmailToken,
} from "../services/auth.service.js";

type CookieOptions = {
  expires: Date;
  httpOnly: boolean;
  secure?: boolean;
};
interface User {
  id: string;
  userName: string;
  email: string;
  isVerified: boolean;
  password?: string;
}

function signToken(userId: string): string {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET as string, {
    expiresIn: process.env.JWT_EXPIRES_IN as jwt.SignOptions["expiresIn"],
  });
}

function createSendToken(user: User, res: Response) {
  const cookieOptions: CookieOptions = {
    expires: new Date(
      Date.now() + Number(process.env.COOKIE_EXPIRES_IN!) * 24 * 60 * 60 * 1000,
    ),
    httpOnly: true,
  };
  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;
  const token = signToken(user.id);
  res.cookie("jwt", token, cookieOptions);

  user.password = undefined;
  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
}

// ************************

export const signUp = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { password, userName, email } = req.body;
    try {
      await createUser(userName, email, password);
    } catch (err) {
      next(err);
    }
    res.status(201).json({
      status: "success",
      message: "Verification email sent. Please verify your email.",
    });
  },
);

export const resendEmailVerification = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;

    try {
      await resendVerificationEmail(email);
    } catch (err) {
      next(err);
    }

    res.status(200).json({
      status: "success",
      message: "If the email exists, a verification mail has been sent.",
    });
  },
);

export const verifyEmail = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { verificationToken } = req.params;

    if (!verificationToken) {
      return next(new AppError("Verification token missing", 400));
    }

    try {
      const verifiedUser = await verifyEmailToken(verificationToken as string);
      createSendToken(verifiedUser, res);
    } catch (err) {
      next(err);
    }
  },
);

export const logIn = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    try {
      const user = await authenticateUser(email, password);
      createSendToken(user, res);
    } catch (err) {
      next(err);
    }
  },
);

export const forgotPassword = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;

    try {
      await generatePasswordResetToken(email);
    } catch (err) {
      next(err);
    }

    res.status(200).json({
      status: "success",
      message: "If a user with that email exists, a reset link has been sent.",
    });
  },
);

export const resetPassword = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { resetToken } = req.params;
    const { newPassword } = req.body;

    try {
      await updatePassword(resetToken as string, newPassword);
      res.status(200).json({
        status: "success",
        message: "Your password has been updated.",
      });
    } catch (err) {
      next(err);
    }
  },
);

export const protect = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { jwt } = req.cookies;
    if (!jwt) {
      return next(new AppError("You are not logged in. Please log in.", 401));
    }

    try {
      const user = await authorize(jwt);
      req.user = user;
      next();
    } catch (err) {
      next(err);
    }
  },
);

export const changePassword = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { password, newPassword } = req.body;
    const { id } = req.user!;

    try {
      await changePasswordAuthorized(password, newPassword, id);
    } catch (err) {
      next(err);
    }

    res.status(200).json({
      status: "success",
      message: "Password changed successfully.",
    });
  },
);

export const changeEmail = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { newEmail } = req.body;
    const { email, userName, id } = req.user!;

    try {
      changeEmailAuthorized(id, newEmail, userName);
    } catch (err) {
      next(err);
    }
  },
);
