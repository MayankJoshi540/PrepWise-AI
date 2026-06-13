import { defineConfig } from "prisma/config";
import * as dotenv from "dotenv";

// Explicitly load .env.local
dotenv.config({ path: ".env.local" });

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    url: process.env.DATABASE_URL,
    directUrl: process.env.DIRECT_URL,
  },
});
