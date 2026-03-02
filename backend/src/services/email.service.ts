import nodemailer from "nodemailer";

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

export const sendVerificationMail = async () => {};
