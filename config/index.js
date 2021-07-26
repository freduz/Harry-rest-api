import dotenv from "dotenv";

dotenv.config({ path: "./.env.config" });

export const { APP_PORT, DEBUG_MODE, DB_URL, DB_PASSWORD, JWT_TOKEN } =
  process.env;
