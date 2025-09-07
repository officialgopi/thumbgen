import { Router } from "express";
import { checkUserMiddleware } from "../middlewares/auth.middleware";
import { generateImage } from "../controllers/generate.controller";
import { imageUpload } from "../middlewares/multer.middleware";

const router = Router();

router.post("/", imageUpload, checkUserMiddleware, generateImage);

export default router;
