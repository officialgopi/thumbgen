import { v2 as cloudinary } from "cloudinary";
import { env } from "../env";
import fs from "fs";

cloudinary.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath: string) => {
  try {
    if (!localFilePath) return null;
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "raw",
    });
    fs.unlinkSync(localFilePath);
    return {
      public_id: response.public_id,
      url: response.secure_url,
    };
  } catch (error) {
    fs.unlinkSync(localFilePath);
    return null;
  }
};

const deletFileFromCloudinary = async (public_id: string) => {
  try {
    await cloudinary.uploader.destroy(public_id);
    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      error: error,
    };
  }
};

const uploadBase64ImageOnCloudinary = async (base64Image: string) => {
  try {
    const response = await cloudinary.uploader.upload(base64Image, {
      resource_type: "image",
    });
    return {
      public_id: response.public_id,
      url: response.secure_url,
    };
  } catch (error) {
    return null;
  }
};

export {
  uploadOnCloudinary,
  deletFileFromCloudinary,
  uploadBase64ImageOnCloudinary,
};
