import { GoogleGenAI } from "@google/genai";
import { env } from "../env";

const gemini = new GoogleGenAI({
  apiKey: env.GEMINI_API_KEY,
});

import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: env.GROQ_API_KEY,
});

export { groq, gemini };
