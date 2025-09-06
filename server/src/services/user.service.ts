import type { User } from "@prisma/client";
import { env } from "../env";
import jwt from "jsonwebtoken";

const sanitizeUser = (user: User) => {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    provider: user.provider,
    credits: user.credits,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
};

const generateTokenAndSaveToDB = async (
  userId: string
): Promise<{
  accessToken: string;
  refreshToken: string;
} | null> => {
  const accessToken = jwt.sign(
    {
      userId,
    },
    env.JWT_SECRET,
    {
      expiresIn: env.JWT_EXPIRES_IN,
    } as jwt.SignOptions
  );
  const refreshToken = jwt.sign(
    {
      userId,
    },
    env.JWT_REFRESH_SECRET!,
    {
      expiresIn: env.JWT_REFRESH_EXPIRES_IN,
    } as jwt.SignOptions
  );

  try {
    await db?.user.update({
      where: {
        id: userId,
      },
      data: {
        refreshToken: refreshToken,
      },
    });
  } catch (error) {
    return null;
  }
  return {
    accessToken,
    refreshToken,
  };
};

const extractUserIdFromToken = async (
  token: string,
  isRefreshToken: boolean = false
): Promise<{
  success: boolean;
  userId?: string;
  error?: string;
}> => {
  const secret = !isRefreshToken ? env.JWT_SECRET : env.JWT_REFRESH_SECRET;

  const decodedToken = jwt.verify(token, secret!) as {
    userId: string;
  } & jwt.JwtPayload;

  if (!decodedToken) {
    return {
      success: false,
      error: "Session Expired",
    };
  }

  if (decodedToken.exp! < Date.now() / 1000) {
    return {
      success: false,
      error: "Session Expired",
    };
  }

  if (!decodedToken.userId) {
    return {
      success: false,
      error: "Session Expired",
    };
  }

  const user = await db?.user.findUnique({
    where: {
      id: decodedToken.userId,
    },
  });
  if (!user) {
    return {
      success: false,
      error: "User not found",
    };
  }

  return {
    success: true,
    userId: decodedToken.userId,
  };
};

export { sanitizeUser, generateTokenAndSaveToDB, extractUserIdFromToken };
