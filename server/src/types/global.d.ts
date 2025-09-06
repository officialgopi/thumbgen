import type { PrismaClient } from "@prisma/client";

declare global {
  var db: PrismaClient | undefined;

  namespace Express {
    interface Request {
      user: {
        id: string;
        avatar?: string;
        email: string;
        name: string;
      };
    }
  }
}

export {};
