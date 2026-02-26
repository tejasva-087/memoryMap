import nodemailer from "nodemailer";
import { render } from "@react-email/render";
import React from "react";

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST!,
  port: Number(process.env.EMAIL_PORT!),
  secure: Number(process.env.EMAIL_PORT) === 465,
  auth: {
    user: process.env.EMAIL_USERNAME!,
    pass: process.env.EMAIL_PASSWORD!,
  },
});

interface SendEmailOptions {
  to: string;
  subject: string;
  reactComponent: React.ReactElement;
  text?: string;
}
const sendMail = async (options: SendEmailOptions): Promise<void> => {
  try {
    const html = await render(options.reactComponent);
    await transporter.sendMail({
      from: "Memory Map <memorymap@tejuss.io>",
      to: options.to,
      subject: options.subject,
      html: html,
    });
  } catch (err) {
    throw err;
  }
};

export default sendMail;
