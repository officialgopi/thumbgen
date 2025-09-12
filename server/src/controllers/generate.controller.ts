import {
  uploadBase64ImageOnCloudinary,
  uploadOnCloudinary,
} from "../libs/cloudinary.lib";
import { authenticateSchemaName } from "../schemas/auth.schemas";
import { AsyncHandler } from "../utils/async-handler.util";
import { ApiError, ApiResponse } from "../utils/response-handler.util";
import { db } from "../db";
import { generatePhotoBodySchema } from "../schemas/generate.schema";
import { genUserPrompt } from "../constants/prompts.constant";
import {
  generateImageViaPrompt,
  generatePromptForImageGeneration,
} from "../services/ai.service";
import fs from "fs";

const generateImage = AsyncHandler(async (req, res) => {
  const { data, success } = authenticateSchemaName.safeParse(req.user);

  if (!success) {
    throw new ApiError(401, "Invalid Account");
  }

  const userId = data.id;

  const file = req.file;

  if (!file) {
    throw new ApiError(400, "No file uploaded");
  }

  const body = JSON.parse(req.body.data);

  req.body.data = body;

  const { data: bodyData, success: isSuccessOnBodyParsing } =
    generatePhotoBodySchema.safeParse(req.body?.data);

  if (!isSuccessOnBodyParsing) {
    fs.unlinkSync(file.path);
    throw new ApiError(400, "Invalid Body");
  }

  const user_prompt = genUserPrompt(bodyData);

  const promptToGenerateImage = await generatePromptForImageGeneration(
    user_prompt
  );
  if (!promptToGenerateImage) {
    fs.unlinkSync(file.path);
    throw new ApiError(400, "Failed to generate prompt");
  }

  const buffer = fs.readFileSync(file.path);

  const base64Image = await generateImageViaPrompt(
    promptToGenerateImage,
    buffer,
    file.filename.split(".")[file.filename.split(".").length - 1],
    bodyData.outputPreferences.downloadFormat ?? "png"
  );

  if (!base64Image) {
    fs.unlinkSync(file.path);
    throw new ApiError(400, "Failed to generate image");
  }

  const inputImageUpload = await uploadOnCloudinary(file.path);

  if (!inputImageUpload) {
    throw new ApiError(400, "Failed to upload image");
  }

  const generatedImage = await uploadBase64ImageOnCloudinary(base64Image);

  if (!generatedImage) {
    throw new ApiError(400, "Failed to upload image");
  }

  const inputImage = await db.inputImage.create({
    data: {
      imageUrl: inputImageUpload.url,
      userId: userId,
      instructions: bodyData,
    },
  });

  await db.generatedImage.create({
    data: {
      image: generatedImage.url,
      userId: userId,
      inputImageId: inputImage.id,
    },
  });

  return new ApiResponse(
    200,
    {
      inputImage: inputImageUpload.url,
      generatedImage: generatedImage.url,
    },
    "Image Generated Successfully"
  ).send(res);
});

export { generateImage };
