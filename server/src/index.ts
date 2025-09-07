import express from "express";
import { env } from "./env";

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
import generateRouter from "./routes/generate.route";
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/generate", generateRouter);

//GLOBAL ERROR MIDDLEWARE
import { errorMiddleware } from "./middlewares/error.middleware";
app.use(errorMiddleware);

app
  .listen(env.PORT, () => {
    console.log(`Server is running on port ${env.PORT}`);
  })
  .on("error", (err) => {
    console.error("Server is not running");

    console.log(err);

    process.exit(1);
  });
