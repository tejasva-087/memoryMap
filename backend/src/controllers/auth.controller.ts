import crypto from "crypto";

import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { eq } from "drizzle-orm";

import { db } from "../server.js";
import catchAsync from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";

import { userTable } from "../schemas/user.schema.js";
import {
  sendPasswordResetMail,
  sendVerificationMail,
} from "../services/email.service.js";
import { AuthenticatedRequest } from "../types/auth.types.js";

function signToken(userId: string): string {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET as string, {
    expiresIn: process.env.JWT_EXPIRES_IN as jwt.SignOptions["expiresIn"],
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
  isVerified: boolean;
  password?: string;
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

function createCryptoToken() {
  const token = crypto.randomBytes(32).toString("hex");
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  return { token, hashedToken };
}

function getHashForCryptoToken(token: string) {
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
  return hashedToken;
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
    } = createCryptoToken();
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
      .returning({ id: userTable.id });
    if (!user) {
      return next(new AppError("Failed to create user", 400));
    }

    // 4. SENDING THE VERIFICATION MAIL
    try {
      await sendVerificationMail({
        receiverEmail: email,
        receiverUserName: userName,
        emailVerificationToken,
      });
    } catch (err) {
      db.delete(userTable).where(eq(userTable.id, user.id));
      return next(new AppError("There was a problem sending mail", 500));
    }

    res.status(201).json({
      status: "success",
      message: "Verification email sent. Please verify your email.",
    });
  },
);

// ************************
// VERIFY EMAIL
// ************************
export const verifyEmail = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // 1. Getting the verification token
    const { verificationToken } = req.params;
    if (!verificationToken) {
      return next(new AppError("Verification token missing", 400));
    }

    // 2. Creating the hash of the token and searching if the token is valid
    const hashedToken = getHashForCryptoToken(verificationToken as string);
    const [user] = await db
      .select({
        id: userTable.id,
        emailVerificationExpiresIn: userTable.emailVerificationExpiresIn,
      })
      .from(userTable)
      .where(eq(userTable.emailVerificationToken, hashedToken));

    // 3. If the token is invalid sending error for retrying
    if (!user) {
      return next(new AppError("The token is invalid, please try again", 400));
    }
    if (
      !user.emailVerificationExpiresIn ||
      new Date(user.emailVerificationExpiresIn).getTime() < new Date().getTime()
    ) {
      await db
        .update(userTable)
        .set({
          emailVerificationToken: null,
          emailVerificationExpiresIn: null,
        })
        .where(eq(userTable.id, user.id));
      return next(new AppError("The token is invalid, please try again", 404));
    }

    // 5. If the token is valid updating the user to be verified
    const [verifiedUser] = await db
      .update(userTable)
      .set({
        emailVerificationToken: null,
        emailVerificationExpiresIn: null,
        isVerified: true,
      })
      .where(eq(userTable.id, user.id))
      .returning({
        id: userTable.id,
        userName: userTable.userName,
        email: userTable.email,
        isVerified: userTable.isVerified,
      });

    createSendToken(verifiedUser, res);
  },
);

// ************************
// RESEND VERIFICATION
// ************************
export const resendVerification = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // 1. Getting the email from the body
    const { email } = req.body;

    // 2. Checking if the user with that email exists or not
    const [user] = await db
      .select({
        id: userTable.id,
        isVerified: userTable.isVerified,
      })
      .from(userTable)
      .where(eq(userTable.email, email));

    // 3. If the user does not exists returning
    if (!user) {
      res.status(200).json({
        status: "success",
        message: `If the email exists a verification mail has been sent to them.`,
      });
    }

    // 4. If the email already verified doing nothing
    if (user.isVerified) {
      res.status(200).json({
        status: "success",
        message: "If the email exists, a verification mail has been sent.",
      });
    }

    // 4. Generating the verification token
    const {
      token: emailVerificationToken,
      hashedToken: hashedEmailVerificationToken,
    } = createCryptoToken();

    // 5. Updating the verification token
    const [updatedUser] = await db
      .update(userTable)
      .set({
        emailVerificationToken: hashedEmailVerificationToken,
        emailVerificationExpiresIn: new Date(
          new Date().getTime() + 10 * 60 * 1000,
        ),
      })
      .where(eq(userTable.id, user.id))
      .returning({
        id: userTable.id,
        userName: userTable.userName,
      });

    // 6. sending the verification code
    try {
      await sendVerificationMail({
        receiverEmail: email,
        receiverUserName: updatedUser.userName,
        emailVerificationToken,
      });
    } catch (err) {
      return next(new AppError("There was a problem sending mail", 500));
    }

    res.status(200).json({
      status: "success",
      message: "If the email exists, a verification mail has been sent.",
    });
  },
);

// ************************
// LOG IN
// ************************
export const logIn = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // 1. Get the login credentials
    const { email, password } = req.body;

    // 2. Check if the user exists
    const [user] = await db
      .select({
        id: userTable.id,
        userName: userTable.userName,
        email: userTable.email,
        password: userTable.password,
        isVerified: userTable.isVerified,
      })
      .from(userTable)
      .where(eq(userTable.email, email));

    // 3. Checking if the password matches
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return next(
        new AppError("Either the password or email is invalid.", 401),
      );
    }

    // 4. Checking if the user is verified
    if (!user.isVerified) {
      return next(
        new AppError("Please verify your email before logging in.", 401),
      );
    }

    // 5. if valid return the user data and JWT
    createSendToken(user, res);
  },
);

// ************************
// AUTHORIZATION
// ************************
interface JwtPayloadWithId extends jwt.JwtPayload {
  id: string;
  iat: number;
  exp: number;
}
export const protect = catchAsync(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    // 1. Getting the jwt token
    const { jwt: jwtToken } = req.cookies;
    if (!jwtToken) {
      return next(new AppError("You are not logged in. Please log in.", 401));
    }

    // 2. Decoding the token
    const decoded = jwt.verify(
      jwtToken,
      process.env.JWT_SECRET as string,
    ) as JwtPayloadWithId;

    // 3. Checking if the user exists with the id
    const [user] = await db
      .select({
        id: userTable.id,
        userName: userTable.userName,
        email: userTable.email,
        isVerified: userTable.isVerified,
        createdAt: userTable.createdAt,
        passwordChangedAt: userTable.passwordChangedAt,
      })
      .from(userTable)
      .where(eq(userTable.id, decoded.id));

    if (!user) {
      return next(
        new AppError("The user belonging to this token no longer exists.", 401),
      );
    }

    // 4. Checking if the password changed after jwt was created
    if (user.passwordChangedAt) {
      const passwordChangedTimestamp = Math.floor(
        new Date(user.passwordChangedAt).getTime() / 1000,
      );

      if (passwordChangedTimestamp > decoded.iat) {
        return next(
          new AppError("Password was changed. Please log in again.", 401),
        );
      }
    }

    // 4. If everything is well adding the user to to request
    req.user = user;
    next();
  },
);

// ************************
// FORGOT PASSWORD
// ************************
export const forgotPassword = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // 1. Getting the email form request
    const { email } = req.body;

    // 2. Checking if the user with that email exists or not
    const [user] = await db
      .select({ id: userTable.id, userName: userTable.userName })
      .from(userTable)
      .where(eq(userTable.email, email));

    if (!user)
      res.status(200).json({
        status: "success",
        message:
          "If a user with that email exists, a reset link has been sent.",
      });

    // 3. If the user exists we sent a token on mail
    const { token: passwordResetToken, hashedToken: hashedPasswordResetToken } =
      createCryptoToken();

    // 4. Storing the hashed token in the
    await db
      .update(userTable)
      .set({
        passwordResetToken: hashedPasswordResetToken,
        passwordResetExpiresIn: new Date(new Date().getTime() + 10 * 60 * 1000),
      })
      .where(eq(userTable.id, user.id));

    // 5. Sending the token to the user
    try {
      await sendPasswordResetMail({
        receiverEmail: email,
        receiverUserName: user.userName,
        passwordResetToken: passwordResetToken,
      });
    } catch (err) {
      await db
        .update(userTable)
        .set({
          passwordResetToken: null,
          passwordResetExpiresIn: null,
        })
        .where(eq(userTable.id, user.id));
      return next(
        new AppError(
          "There was an error sending the reset link on your mail. Please try again.",
          500,
        ),
      );
    }

    res.status(200).json({
      status: "success",
      message: "If a user with that email exists, a reset link has been sent.",
    });
  },
);

// ************************
// RESET PASSWORD
// ************************
export const resetPassword = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // 1. Getting the token nad new credentials
    const { resetToken } = req.params;
    const { newPassword } = req.body;
    const hashedResetToken = getHashForCryptoToken(resetToken as string);

    // 2. Checking if the user exists with that token
    const [user] = await db
      .select({
        id: userTable.id,
        passwordResetExpiresIn: userTable.passwordResetExpiresIn,
      })
      .from(userTable)
      .where(eq(userTable.passwordResetToken, hashedResetToken));

    if (!user) {
      return next(new AppError("The verification link is invalid.", 400));
    }

    // 3. Has the link expired or not
    if (
      !user.passwordResetExpiresIn ||
      new Date(user.passwordResetExpiresIn).getTime() < new Date().getTime()
    ) {
      await db
        .update(userTable)
        .set({
          passwordResetToken: null,
          passwordResetExpiresIn: null,
        })
        .where(eq(userTable.id, user.id));
      return next(new AppError("The verification link has expired.", 400));
    }

    // 4. Commit the changes to the main database and remove the unnecessary day
    const [updatedUser] = await db
      .update(userTable)
      .set({
        passwordResetToken: null,
        passwordResetExpiresIn: null,
        password: await bcrypt.hash(newPassword, 12),
        passwordChangedAt: new Date(),
      })
      .where(eq(userTable.id, user.id))
      .returning({
        id: userTable.id,
        userName: userTable.userName,
        email: userTable.email,
        isVerified: userTable.isVerified,
      });

    createSendToken(updatedUser, res);
  },
);

// ************************
// CHANGE PASSWORD
// ************************
export const changePassword = catchAsync(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    // 1. Getting the old, new password and user details
    const { password, newPassword } = req.body;
    const { id } = req.user!;

    // 2. Getting the password form the user
    const [user] = await db
      .select({ password: userTable.password })
      .from(userTable)
      .where(eq(userTable.id, id));

    // 3. Checking if the password matches
    if (!(await bcrypt.compare(password, user.password)))
      return next(new AppError("The provided password is incorrect", 400));

    // 4. Changing the password
    const hashedPassword = await bcrypt.hash(newPassword, 12);
    await db
      .update(userTable)
      .set({
        password: hashedPassword,
        passwordChangedAt: new Date(),
      })
      .where(eq(userTable.id, id));

    res.status(200).json({
      status: "success",
      message: "Password changed successfully",
    });
  },
);

// ************************
// CHANGE EMAIL
// ************************

export const changeEmail = catchAsync(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    // 1. Getting the old and new email and user current email form request
    const { newEmail } = req.body;
    const { email } = req.user;

    if (email === newEmail)
      return next(
        new AppError("The new email cannot be similar to the old email", 400),
      );

    // 2. changing the email
    await db.update(userTable).set({
      email: newEmail,
      isVerified: false,
    });

    // 3. Sending the verification mail
  },
);
