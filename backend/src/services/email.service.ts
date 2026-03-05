import React from "react";
import nodemailer from "nodemailer";
import AppError from "../utils/appError.js";
import verifyEmailTemplate from "../emails/VerifyEmail.js";
import passwordResetTemplate from "../emails/ResetPassword.js";

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST!,
  port: Number(process.env.EMAIL_PORT!),
  secure: Number(process.env.EMAIL_PORT) === 465,
  auth: {
    user: process.env.EMAIL_USERNAME!,
    pass: process.env.EMAIL_PASSWORD!,
  },
});

// ***************************
// SEND MAIL
// ***************************
interface SendEmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}
export const sendMail = async (options: SendEmailOptions): Promise<void> => {
  try {
    await transporter.sendMail({
      from: "Memory Map <memorymap@tejuss.io>",
      to: options.to,
      subject: options.subject,
      html: options.html,
      text: options?.text,
    });
  } catch (err) {
    new AppError("Failed to send verification code, please try again.", 500);
  }
};

// ****************************
// SEND VERIFICATION MAIL
// ****************************

export const sendVerificationMail = async (
  receiverEmail: string,
  receiverUserName: string,
  emailVerificationToken: string,
) => {
  try {
    const verificationUrl =
      process.env.FE_EMAIL_VERIFICATION_LINK + "/" + emailVerificationToken;
    const html = verifyEmailTemplate
      .replace("[USER_NAME]", receiverUserName)
      .replaceAll("[VERIFICATION_URL]", verificationUrl);

    await sendMail({
      to: receiverEmail,
      subject: "Memory Map - Email Address Verification",
      html,
    });
  } catch (err) {
    console.error(err);
    throw err;
  }
};

// ****************************
// SEND PASSWORD RESET MAIL
// ****************************
export const sendPasswordResetMail = async (
  receiverEmail: string,
  receiverUserName: string,
  passwordResetToken: string,
) => {
  try {
    const passwordResetUrl =
      process.env.FE_PASSWORD_RESET_LINK + "/" + passwordResetToken;
    const html = passwordResetTemplate
      .replace("[USER_NAME]", receiverUserName)
      .replaceAll("[RESET_URL]", passwordResetUrl);

    await sendMail({
      to: receiverEmail,
      subject: "Memory Map - Password Reset",
      html,
    });
  } catch (err) {
    throw err;
  }
};
