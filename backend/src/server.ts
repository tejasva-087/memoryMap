/* eslint-disable no-console */
import "dotenv/config";
import { Pool } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";
import sharp from "sharp";

sharp.concurrency(2);
sharp.cache(false);

import app from "./app.js";

process.on("uncaughtException", (err: Error) => {
  console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});

const DB =
  process.env.NODE_ENV === "development"
    ? process.env.DATABASE_URL_DEV
    : process.env.DATABASE_URL_PROD;
const pool = new Pool({ connectionString: DB });
export const db = drizzle(pool);

let server: ReturnType<typeof app.listen>;

const startServer = async () => {
  try {
    await pool.query(`SELECT 1`);
    console.log("✅ Database connection successful");

    server = app.listen(process.env.PORT, () => {
      console.log(`🚀 SERVER STARTED ON PORT: ${process.env.PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to connect to the database:", error);
    process.exit(1);
  }
};

startServer();

process.on("unhandledRejection", (err: Error) => {
  console.log("UNHANDLED REJECTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
