import {
  authenticateSchemaName,
  refreshAccessTokenSchema,
} from "../schemas/auth.schemas";
import {
  extractUserIdFromToken,
  generateTokenAndSaveToDB,
} from "../services/user.service";
import { AsyncHandler } from "../utils/async-handler.util";
import { ApiError, ApiResponse } from "../utils/response-handler.util";
import { db } from "../db";

const authenticate = AsyncHandler(async (req, res) => {
  const { data, success } = authenticateSchemaName.safeParse(req.user);

  if (!success) {
    throw new ApiError(401, "Invalid Account");
  }

  const tokens = await generateTokenAndSaveToDB(data.id);

  if (!tokens) {
    throw new ApiError(400, "Cannot login right Now");
  }

  res.setHeader("Authorization", tokens.accessToken);

  new ApiResponse(
    200,
    {
      "refresh-token": tokens.refreshToken,
    },
    `Welcome back ${data.name}`
  ).send(res);
});

const getMe = AsyncHandler(async (req, res) => {
  if (!req.user) {
    throw new ApiError(401, "You are not logged in");
  }
  return res.status(200).json(
    new ApiResponse(
      200,
      {
        user: req.user,
      },
      "Success"
    )
  );
});

const logout = AsyncHandler(async (req, res) => {
  const { data, success } = authenticateSchemaName.safeParse(req.user);

  if (!success) {
    return new ApiResponse(200, null, "Logout Successful").send(res);
  }

  await db.user.update({
    where: {
      id: data.id,
    },
    data: {
      refreshToken: undefined,
    },
  });
  return new ApiResponse(200, null, "Logout Successful").send(res);
});

const refreshAccessToken = AsyncHandler(async (req, res) => {
  const { data, success } = refreshAccessTokenSchema.safeParse(req.body);

  if (!success) {
    throw new ApiError(400, "Session Expired");
  }

  const refreshToken = data["refresh-token"];

  const extractedData = await extractUserIdFromToken(refreshToken, true);

  if (!extractedData.success) {
    throw new ApiError(400, extractedData.error);
  }

  const tokens = await generateTokenAndSaveToDB(extractedData.userId!);

  if (!tokens) {
    throw new ApiError(400, "Login First");
  }

  res.setHeader("Authorization", tokens.refreshToken);

  return new ApiResponse(200, {
    "refresh-token": tokens.refreshToken,
  }).send(res);
});

export { authenticate, getMe, logout, refreshAccessToken };
