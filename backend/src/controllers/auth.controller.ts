import crypto from "crypto";

import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";

import { db } from "../server.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";

import { userTable } from "../schemas/user.schema.js";
import sendMail from "../utils/sendMail.js";

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
interface User {
  id: string;
  userName: string;
  email: string;
  password?: string;
}
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

function createRandomVerificationToken() {
  const token = crypto.randomBytes(32).toString("hex");
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  return { token, hashedToken };
}

// ************************
// SIGN UP
// ************************
export const signUp = catchAsync(
  async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void | never> => {
    // 1. GETTING SIGN UP DETAILS FORM REQUEST
    const { password, userName, email } = req.body;

    // 2. GENERATING TOKEN AND HASHING THE TOKEN AND PASSWORD
    const {
      token: emailVerificationToken,
      hashedToken: hashedEmailVerificationToken,
    } = createRandomVerificationToken();
    const hashedPassword = await bcrypt.hash(password, 12);

    // 3. STORING THE DATA IN DATABASE
    const [user] = await db
      .insert(userTable)
      .values({
        userName,
        email,
        emailVerificationToken: hashedEmailVerificationToken,
        emailVerificationExpiresIn: new Date(Date.now() + 10 * 60 * 1000),
        password: hashedPassword,
      })
      .returning({
        id: userTable.id,
        userName: userTable.userName,
        email: userTable.email,
      });

    if (!user) {
      next(new AppError("Failed to create user", 400));
    }

    // 4. SENDING THE VERIFICATION MAIL
    try {
      await sendMail({ to: email, subject: "Hello", html: "World" });
    } catch (err) {
      await db.delete(userTable).where(eq(userTable.id, user.id));
      return next(
        new AppError(
          "There was an error sending the verification mail. Please try again.",
          400,
        ),
      );
    }

    createSendToken(user, res);
  },
);

export const logIn = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    const [user] = await db
      .select()
      .from(userTable)
      .where(eq(userTable.email, email));

    if (!user || !(await bcrypt.compare(password, user.password))) {
      next(new AppError("Either the password or email is invalid.", 403));
    }

    createSendToken(user, res);
  },
);
