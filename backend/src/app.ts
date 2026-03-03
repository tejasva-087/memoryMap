import express from "express";
import { Request, Response, NextFunction } from "express";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";

import userRouter from "./routes/auth.route.js";
import globalErrorHandler from "./controllers/error.controller";
import AppError from "./utils/appError";

const app = express();

export const apiLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 1000,
  message: {
    status: "fail",
    message: "Too many requests. Please try again later.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(express.json({ limit: "10kb" }));
app.use(cookieParser());

app.use(express.static("public"));

app.use("/api/v1/user", userRouter);

app.use((req: Request, res: Response, next: NextFunction) => {
  return next(
    new AppError(`Can't find ${req.originalUrl} on this server!`, 404),
  );
});

app.use(globalErrorHandler);

export default app;
