import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";

import { db } from "../server.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";

import { usersTable } from "../schemas/user.schema.js";

function signToken(userId: string): string {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET!, {
    expiresIn: Number(process.env.JWT_EXPIRES_IN!) * 24 * 60 * 60,
  });
}

type CookieOptions = {
  expires: Date;
  httpOnly: boolean;
  secure?: boolean;
};
type User = {
  firstName: string;
  lastName: string;
  email: string;
  id: string;
  password?: string;
};
function createSendToken(user: User, res: Response) {
  const cookieOptions: CookieOptions = {
    expires: new Date(
      Date.now() + Number(process.env.JWT_EXPIRES_IN!) * 24 * 60 * 60 * 1000,
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

export const signUp = catchAsync(
  async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void | never> => {
    const { password, firstName, lastName, email } = req.body;
    const hashedPassword = await bcrypt.hash(password, 12);

    const [user] = await db
      .insert(usersTable)
      .values({ firstName, lastName, email, password: hashedPassword })
      .returning({
        id: usersTable.id,
        firstName: usersTable.firstName,
        lastName: usersTable.lastName,
        email: usersTable.email,
      });

    if (!user) {
      next(new AppError("Failed to create user", 400));
    }

    createSendToken(user, res);
  },
);

export const logIn = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    const [user] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email));

    if (!user || !(await bcrypt.compare(password, user.password))) {
      next(new AppError("Either the password or email is invalid.", 403));
    }

    createSendToken(user, res);
  },
);
