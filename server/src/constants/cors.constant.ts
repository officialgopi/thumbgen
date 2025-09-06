import type { CorsOptions } from "cors";
import { env } from "../env";

const corsOptions: CorsOptions = {
  allowedHeaders: ["Content-Type", "Authorization"],
  origin: env.NODE_ENV === "development" ? "*" : env.CLIENT_URL,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
};

export { corsOptions };
