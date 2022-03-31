/* eslint-disable no-unused-vars */
// Import modules.
import express from "express";
const router = express.Router();
import rateLimit from "express-rate-limit";
import slowDown from "express-slow-down";
import ValidateAPIVersion from "../middleware/ValidateAPIVersion";
import fs from "fs";
import { deprecatedVersions } from "./APIVersions.json";
import path from "path";

// Rate limiting and speed limiting // Feel free to configure stuff here.
const limiter = rateLimit({
  windowMs: 3600000,
  max: 100,
  message: "",
  statusCode: 404,
});

const speedLimiter = slowDown({
  windowMs: 1500000,
  delayAfter: 30,
  delayMs: 150,
});

router.use(limiter);
router.use(speedLimiter);

// Versions routing.
const versionsDirectory = fs.readdirSync("./src/api/versions");

router.use(`/v:version/*`, ValidateAPIVersion);
versionsDirectory.forEach((directory) => {
  const dir = fs.readdirSync(`./src/api/versions/${directory}`);
  const routers = fs.readdirSync(`./src/api/versions/${directory}/routers`);
  routers.forEach((rtr) => {
    console.log(
      `Loaded API router /${directory}/${path
        .parse(rtr)
        .name.toLowerCase()} successfully!`
    ); // If you don't want your terminal to be spammed with these for each router, then comment this line or delete it.
    router.use(
      `/v${directory.replace("v", "")}/${path.parse(rtr).name.toLowerCase()}`,
      require(`./versions/${directory}/routers/${rtr}`)
    ); // This line sets all routes coming to that URL as routers.
  });
});

// Deprecated versions routing.
deprecatedVersions.forEach((version, index, array) => {
  router.use(`/v${version}`, require("../middleware/DeprecatedAPIVersion"));
  router.use(`/v${version}/`, require("../middleware/DeprecatedAPIVersion"));
  router.use(`/v${version}/*`, require("../middleware/DeprecatedAPIVersion"));
});

module.exports = router; // Never do export default router, that won't work, just keep doing the safe module.exports = router method.
