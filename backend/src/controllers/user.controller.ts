import { NextFunction, Request, Response } from "express";

import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";

import { db } from "../server";
import { userTable } from "../schemas/user.schema";
import { AuthenticatedRequest } from "../types/auth.types";
import catchAsync from "../utils/catchAsync";
import AppError from "../utils/appError";
import { sendVerificationMail } from "../services/email.service";
import {
  changeEmailAuthorized,
  changePasswordAuthorized,
} from "../services/auth.service";

export const changePassword = catchAsync(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const { password, newPassword } = req.body;
    const { id } = req.user;

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

// ************************
// CHANGE EMAIL
// ************************
export const changeEmail = catchAsync(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const { newEmail } = req.body;
    const { email, userName, id } = req.user;

    try {
      changeEmailAuthorized(email, newEmail, userName, id);
    } catch (err) {
      next(err);
    }
  },
);
