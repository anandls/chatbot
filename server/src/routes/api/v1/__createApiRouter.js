import glob from "glob";
import { Router } from "express";

const router = Router();

//console.log(`${__dirname}/`);
module.exports = () =>
  glob
    .sync("**/*.js", { cwd: `${__dirname}/` })
    .map((filename) => require(`./${filename}`))
    .filter((router) => Object.getPrototypeOf(router) == Router)
    .reduce(
      (rootRouter, router) => rootRouter.use(router),
      Router({ mergeParams: true })
    );
