import express from "express";
import cors from "cors";
import morgan from "morgan";
import fs from "fs";
import path from "path";
import compression from "compression";
import helmet from "helmet";

import winston from "./winston";

const isDev = process.env.NODE_ENV === "development";
const isProd = process.env.NODE_ENV === "production";

export default (app) => {
  // app.use(
  //   cors({
  //     origin: process.env.ALLOW_ORIGIN,
  //     preflightContinue: true,
  //     credentials: true,
  //     allowedHeaders: "X-Requested-With, Content-Type, Authorization",
  //     methods: "GET, POST, PATCH, PUT, POST, DELETE, OPTIONS",
  //     exposedHeaders: ["Content-Length", "X-Foo", "X-Bar"],
  //   })
  // );

  app.use(cors());

  // use for < Express 4
  // app.use(bodyParser.json());
  // app.use(bodyParser.urlencoded({ extended: true }));

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  if (isDev) {
    let accessLogStream = fs.createWriteStream(
      path.join(__dirname, "../../logs/access_morgan.log"),
      { flags: "a" }
    );
    //app.use(morgan("dev", { stream: accessLogStream }));

    //app.use(morgan("combined", { stream: winston.stream }));
  }

  if (isProd) {
    app.use(compression()); //cpu heavy -> move to Nginx etc.
    app.use(helmet());
  }
};
