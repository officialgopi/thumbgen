import { Router } from "express";
import passport from "passport";
import { env } from "../env";
import {
  authenticate,
  getMe,
  logout,
  refreshAccessToken,
} from "../controllers/auth.controller";
import { checkUserMiddleware } from "../middlewares/auth.middleware";

const router = Router();

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "select_account",
  })
);
//GOOGLE LOGIN FALLBACK
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: `${env.CLIENT_URL}`,
    session: false,
  }),
  authenticate
);
router.delete("/logout", checkUserMiddleware, logout);
router.get("/me", checkUserMiddleware, getMe);
router.put("/refresh-access-token", refreshAccessToken);

export default router;
