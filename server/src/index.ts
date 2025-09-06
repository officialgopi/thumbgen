import express from "express";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

import cors from "cors";
import { corsOptions } from "./constants/cors.constant";
app.use(cors(corsOptions));

//INITIALIZE PASSPORT
import { initPassport } from "./libs/passport.lib";
initPassport();

import authRouter from "./routes/auth.route";
import { env } from "./env";
app.use("/api/v1/auth", authRouter);

//GLOBAL ERROR MIDDLEWARE
import { errorMiddleware } from "./middlewares/error.middleware";
app.use(errorMiddleware);

app
  .listen(env.PORT, () => {
    console.log(`Server is running on port ${env.PORT}`);
  })
  .on("error", () => {
    console.error("Server is not running");
    process.exit(1);
  });
