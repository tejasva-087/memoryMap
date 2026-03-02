import React from "react";
import nodemailer from "nodemailer";
import VerifyEmail from "../emails/template/VerifyEmail.js";
import renderEmail from "../emails/renderEmail.js";
import ResetPassword from "../emails/template/ResetPassword.js";

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
    throw err;
  }
};

// ****************************
// SEND VERIFICATION MAIL
// ****************************
interface SendVerificationMailOptions {
  receiverEmail: string;
  receiverUserName: string;
  emailVerificationToken: string;
}
export const sendVerificationMail = async ({
  receiverEmail,
  receiverUserName,
  emailVerificationToken,
}: SendVerificationMailOptions) => {
  try {
    const verificationUrl =
      process.env.FE_EMAIL_VERIFICATION_LINK + "/" + emailVerificationToken;
    const html = renderEmail(
      React.createElement(VerifyEmail, {
        userName: receiverUserName,
        verificationUrl,
      }),
    );

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
interface SendPasswordResetMailOptions {
  receiverEmail: string;
  receiverUserName: string;
  passwordResetToken: string;
}
export const sendPasswordResetMail = async ({
  passwordResetToken,
  receiverEmail,
  receiverUserName,
}: SendPasswordResetMailOptions) => {
  try {
    const passwordResetUrl =
      process.env.FE_PASSWORD_RESET_LINK + "/" + passwordResetToken;

    await sendMail({
      to: receiverEmail,
      subject: "Memory Map - Password Reset",
      html: renderEmail(
        React.createElement(ResetPassword, {
          userName: receiverUserName,
          passwordResetUrl,
        }),
      ),
    });
  } catch (err) {
    throw err;
  }
};
