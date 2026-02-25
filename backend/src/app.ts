import express from "express";
import { Request, Response, NextFunction } from "express";
import cookieParser from "cookie-parser";

import userRouter from "./routes/user.route.js";
import globalErrorHandler from "./controllers/error.controller";
import AppError from "./utils/appError";

const app = express();

app.use(express.json({ limit: "10kb" }));
app.use(cookieParser());

app.use("/api/v1", userRouter);

app.use((req: Request, res: Response, next: NextFunction) => {
  return next(
    new AppError(`Can't find ${req.originalUrl} on this server!`, 404),
  );
});

app.use(globalErrorHandler);

export default app;
