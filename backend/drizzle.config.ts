import dotenv from "dotenv";
import { defineConfig } from "drizzle-kit";

dotenv.config({ path: ".env" });

export default defineConfig({
  out: "./drizzle",
  schema: "./src/schemas/**/*.ts",
  dialect: "postgresql",
  dbCredentials: {
    url:
      process.env.NODE_ENV! === "development"
        ? process.env.DATABASE_URL_DEV!
        : process.env.DATABASE_URL_PROD!,
  },
});
