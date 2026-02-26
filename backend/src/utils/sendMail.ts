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

interface SendEmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}
const sendMail = async (options: SendEmailOptions): Promise<void> => {
  try {
    await transporter.sendMail({
      from: "Memory Map <memorymap@tejuss.io>",
      to: options.to,
      html: options.html,
    });
  } catch (err) {
    throw err;
  }
};

export default sendMail;
