import express from "express";
const app = express();

import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

import dbConnection from "./src/database/dbConnection.js";
import routes from "./src/routes.js";
import error from "./src/middleware/error.js";
import requestParameters from "./src/middleware/requestParameters.js";

dotenv.config({ path: ".env" });

const PORT = 4000;

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  delayMs: 0,
});

app.use(limiter);

app.use(express.json({ limit: "5mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "5mb" }));

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'"],
      },
    },
  })
);

app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

dbConnection();

app.use(requestParameters);

app.use("/api/", routes);

app.use(error);

app.listen(PORT, () => console.log("Listening on PORT " + PORT));
