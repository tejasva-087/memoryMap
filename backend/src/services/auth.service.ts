import crypto from "crypto";

import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import { db } from "../server";
import { eq } from "drizzle-orm";
import { userTable } from "../schemas/user.schema";
import { sendPasswordResetMail, sendVerificationMail } from "./email.service";
import AppError from "../utils/appError";

// ************************
// HELPER FUNCTIONS
// ************************

function generateRandomToken() {
  const token = crypto.randomBytes(32).toString("hex");
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  return { token, hashedToken };
}

function hashToken(token: string) {
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
  return hashedToken;
}

async function hashUserPassword(password: string) {
  return await bcrypt.hash(password, 12);
}

// ************************
// AUTH FUNCTIONS
// ************************

// sign up
export const createUser = async function (
  userName: string,
  email: string,
  password: string,
) {
  const { token, hashedToken } = generateRandomToken();

  // Adding the new user to database
  const [user] = await db
    .insert(userTable)
    .values({
      userName,
      email,
      emailVerificationToken: hashedToken,
      emailVerificationExpiresIn: new Date(Date.now() + 10 * 60 * 1000),
      password: await hashUserPassword(password),
    })
    .returning({ id: userTable.id });

  if (!user) {
    throw new AppError("Failed to create user", 400);
  }

  // Sending verification mail
  try {
    await sendVerificationMail(email, userName, token);
  } catch (err) {
    await db.delete(userTable).where(eq(userTable.id, user.id));
    throw err;
  }
};

// resend verification
export const resendVerificationEmail = async (email: string) => {
  // Getting the user with the provided email
  const [user] = await db
    .select({
      id: userTable.id,
      isVerified: userTable.isVerified,
    })
    .from(userTable)
    .where(eq(userTable.email, email));

  // IMP: If the user doesn't exist we are sending this generic response
  if (!user || user.isVerified) return;

  // Updating the verification token and its expiration
  const { token, hashedToken } = generateRandomToken();
  const [updatedUser] = await db
    .update(userTable)
    .set({
      emailVerificationToken: hashedToken,
      emailVerificationExpiresIn: new Date(
        new Date().getTime() + 10 * 60 * 1000,
      ),
    })
    .where(eq(userTable.id, user.id))
    .returning({
      id: userTable.id,
      userName: userTable.userName,
    });

  // sending the verification mail
  try {
    await sendVerificationMail(email, updatedUser.userName, token);
  } catch (err) {
    throw err;
  }
};

// verify email
export const verifyEmailToken = async (verificationToken: string) => {
  // Getting the user with provided email
  const [user] = await db
    .select({
      id: userTable.id,
      emailVerificationExpiresIn: userTable.emailVerificationExpiresIn,
    })
    .from(userTable)
    .where(eq(userTable.emailVerificationToken, hashToken(verificationToken)));

  // If the token is expired or invalid throwing error
  if (!user) throw new AppError("The token is invalid, please try again", 400);
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
    throw new AppError("The token is invalid, please try again", 400);
  }

  // Updating the user to be verified and removing unnecessary properties
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

  return verifiedUser;
};

// log in
export const authenticateUser = async (email: string, password: string) => {
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

  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new AppError("Either the password or email is invalid.", 401);
  }

  if (!user.isVerified) {
    throw new AppError("Please verify your email before logging in.", 401);
  }

  return user;
};

// forgot password
export const generatePasswordResetToken = async (email: string) => {
  // getting the user with the provided email
  const [user] = await db
    .select({ id: userTable.id, userName: userTable.userName })
    .from(userTable)
    .where(eq(userTable.email, email));

  if (!user) return;

  // Setting up the token and its expiration
  const { token, hashedToken } = generateRandomToken();
  await db
    .update(userTable)
    .set({
      passwordResetToken: hashedToken,
      passwordResetExpiresIn: new Date(new Date().getTime() + 10 * 60 * 1000),
    })
    .where(eq(userTable.id, user.id));

  // Sending password reset token
  try {
    await sendPasswordResetMail(email, user.userName, token);
  } catch (err) {
    await db
      .update(userTable)
      .set({
        passwordResetToken: null,
        passwordResetExpiresIn: null,
      })
      .where(eq(userTable.id, user.id));
    throw err;
  }
};

// reset password
export const updatePassword = async (
  passwordResetToken: string,
  newPassword: string,
) => {
  // Checking the reset token is valid or not
  const hashedResetToken = hashToken(passwordResetToken);
  const [user] = await db
    .select({
      id: userTable.id,
      passwordResetExpiresIn: userTable.passwordResetExpiresIn,
    })
    .from(userTable)
    .where(eq(userTable.passwordResetToken, hashedResetToken));

  if (!user) throw new AppError("The password reset link is invalid.", 400);

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
    throw new AppError("The verification link has expired.", 400);
  }

  // if the link is valid updating the password
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

  return updatedUser;
};

// protect
interface JwtPayloadWithId extends jwt.JwtPayload {
  id: string;
  iat: number;
  exp: number;
}
export const authorize = async (jwtToken: string) => {
  const { id, iat, exp } = jwt.verify(
    jwtToken,
    process.env.JWT_SECRET!,
  ) as JwtPayloadWithId;

  // Getting the user with the id in jwt
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
    .where(eq(userTable.id, id));

  if (!user)
    throw new AppError(
      "The user belonging to this token no longer exists.",
      401,
    );

  // If the password was changed after the jwt was created throwing an error
  if (user.passwordChangedAt) {
    const passwordChangedTimestamp = Math.floor(
      new Date(user.passwordChangedAt).getTime() / 1000,
    );

    if (passwordChangedTimestamp > iat) {
      throw new AppError("Password was changed. Please log in again.", 401);
    }
  }

  return user;
};
