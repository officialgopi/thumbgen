import { PrismaClient } from "@prisma/client";
import { env } from "./env";

// Reuse existing instance in dev to avoid too many connections
const prisma = globalThis.db ?? new PrismaClient();

if (env.NODE_ENV !== "production") {
  globalThis.db = prisma;
}

export const db = prisma;
