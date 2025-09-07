import { gemini, groq } from "../libs/ai.lib";
import { genUserPrompt, SYSTEM_PROMPT } from "../constants/prompts.constant";
import { uploadBase64ImageOnCloudinary } from "../libs/cloudinary.lib";

async function generatePromptForImageGeneration(USER_PROMPT: string) {
  try {
    const response = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "system",
          content: SYSTEM_PROMPT,
        },
        {
          role: "user",
          content: USER_PROMPT,
        },
      ],
    });

    return response.choices[0].message.content;
  } catch (error) {
    return null;
  }
}

const generateImageViaPrompt = async (
  prompt: string,
  buffer: Buffer,
  uploadedFormat = "png",
  format: string = "png"
) => {
  try {
    const base64 = buffer.toString("base64");
    const response = await gemini.models.generateContent({
      model: "gemini-2.5-flash-image-preview",
      contents: [
        {
          text: prompt,
        },
        {
          inlineData: {
            mimeType: `image/${uploadedFormat}`,
            data: base64,
          },
        },
      ],
    });

    const candidate = response.candidates?.[0];
    if (!candidate?.content?.parts) {
      throw new Error("No valid response from Gemini");
    }

    for (const part of candidate.content.parts) {
      if (part.text) {
        console.log(part.text);
      } else if (part.inlineData) {
        const imageData = part.inlineData.data; // base64 string
        const base64Image = `data:image/${format};base64,${imageData}`;

        return base64Image;
      }
    }
    return null;
  } catch (error) {
    return null;
  }
};

export { generatePromptForImageGeneration, generateImageViaPrompt };
