import { Request, Response, NextFunction } from "express";
import catchAsync from "../utils/catchAsync";
import AppError from "../utils/appError";

export const verifyCaptcha = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const token = req.body.captchaToken;

    if (!token) return next(new AppError("Captcha token missing.", 400));

    const response = await fetch("https://hcaptcha.com/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        secret: process.env.HCAPTCHA_SECRET_KEY!,
        response: token,
      }),
    });
    const data = await response.json();

    if (!data.success)
      return next(new AppError("Captcha verification failed.", 400));

    next();
  },
);
