/* eslint-disable no-console */
import "dotenv/config";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

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
const sql = neon(DB!);
drizzle({ client: sql });

const startServer = async () => {
  try {
    await sql`SELECT 1`;
    console.log("✅ Database connection successful");

    app.listen(process.env.PORT, () => {
      console.log(`🚀 SERVER STARTED ON PORT: ${process.env.PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to connect to the database:", error);
    process.exit(1);
  }
};

startServer();

const server = app.listen(process.env.PORT, () => {
  console.log(`SERVER STARTED ON PORT: ${process.env.PORT}`);
});

process.on("unhandledRejection", (err: Error) => {
  console.log("UNHANDLED REJECTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
