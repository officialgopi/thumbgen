import { extractUserIdFromToken, sanitizeUser } from "../services/user.service";
import { AsyncHandler } from "../utils/async-handler.util";
import { ApiError } from "../utils/response-handler.util";
import { db } from "../db";

const checkUserMiddleware = AsyncHandler(async (req, _res, next) => {
  const accessToken = req.headers["authorization"] as string | undefined;

  if (typeof accessToken !== "string") {
    throw new ApiError(400, "Please Login first to access");
  }

  const { success, userId } = await extractUserIdFromToken(accessToken);

  if (!success) {
    throw new ApiError(400, "Please Login first to access");
  }

  const user = await db.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw new ApiError(400, "Please Login first to access");
  }

  req.user = sanitizeUser(user);

  next();
});

export { checkUserMiddleware };
