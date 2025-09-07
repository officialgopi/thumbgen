import z from "zod";

const generatePhotoBodySchema = z.object({
  prompt: z.string().optional(),
  fontOptions: z.object({
    mainTitle: z.string(),
    description: z.string(),
    fontStyle: z
      .enum([
        "modern",
        "bold",
        "handwritten",
        "playful",
        "professional",
        "casual",
        "funny",
        "romantic",
      ])
      .default("modern"),
    fontColor: z.string().default("black"),
    backgroundColor: z.string().default("white"),
    fontSize: z
      .enum(["very-small", "small", "medium", "large", "very-large"])
      .default("medium"),
    fontFamily: z.string().default("Inter"),
  }),
  photoOptions: z.object({
    backgroundType: z
      .enum([
        "blur-the-uploaded-photo",
        "solid-background",
        "gradient-background",
        "ai-generated-background",
      ])
      .default("ai-generated-background"),
    someDetailAboutBackground: z.string(),
  }),
  thumbnailElements: z.object({
    ctaBadge: z.string().default("Watch Now or Miss"),
  }),
  outputPreferences: z.object({
    thumbnailSize: z
      .enum([
        "1280x720", // YouTube thumbnail
        "1920x1080", // HD (16:9) universal
        "1080x1080", // Instagram post
        "1080x1350", // Instagram portrait
        "1080x1920", // Reels/TikTok/Stories
        "1200x627", // LinkedIn/Twitter posts
        "1584x396", // LinkedIn banner
      ])
      .default("1280x720"),
    downloadFormat: z.enum(["png", "jpg", "jpeg", "webp"]).default("png"),
    downloadQuality: z.enum(["low", "medium", "high"]).default("medium"),
  }),
});

const followUpRequestBody = z.object({
  followUpRequest: z.string(),
});

export { generatePhotoBodySchema, followUpRequestBody };
