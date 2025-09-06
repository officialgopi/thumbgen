import "dotenv/config";

import { z } from "zod";

function parseEnv(env: NodeJS.ProcessEnv) {
  const schema = z.object({
    PORT: z.coerce.number().default(3000),
    NODE_ENV: z.enum(["development", "production"]).default("development"),
    DATABASE_URL: z.string(),
    JWT_SECRET: z.string().min(32),
    JWT_EXPIRES_IN: z.string().default("7d"),
    JWT_REFRESH_SECRET: z.string().min(32),
    JWT_REFRESH_EXPIRES_IN: z.string().default("7d"),
    GOOGLE_CLIENT_ID: z.string(),
    GOOGLE_CLIENT_SECRET: z.string(),
    GOOGLE_REDIRECT_URI: z.url(),
    CLIENT_URL: z.url(),
  });

  const parsed = schema.safeParse(env);
  if (!parsed.success) {
    console.error(parsed.error);
    process.exit(1);
  }
  return parsed.data;
}

export const env = parseEnv(process.env);
