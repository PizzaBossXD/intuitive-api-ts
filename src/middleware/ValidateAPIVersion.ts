import Versions from "../api/APIVersions.json";
import fs from "fs";
const deprecatedVersions = Versions.deprecatedVersions || [];

const ValidateAPIVersion = (req, res, next) => {
  try {
    const checkVersion =
      fs.readdirSync(`./src/api/versions/v${req.params.version}`) || null;

    if (checkVersion === null || isNaN(req.params.version)) {
      res.status(404);
      const error = new Error(`Invalid API Version!`);
      next(error);
    } else if (
      deprecatedVersions.find((foundVersion) => {
        return foundVersion === parseInt(req.params.version);
      })
    ) {
      res.status(404);
      const error = new Error(`Deprecated API Version!`);
      next(error);
    } else {
      next();
    }
  } catch {
    if (deprecatedVersions.includes(parseInt(req.params.version))) {
      res.status(404);
      const error = new Error(`Deprecated API Version!`);
      next(error);
      return;
    }
    res.status(404);
    const error = new Error(`Invalid API Version!`);
    next(error);
  }
};

export default ValidateAPIVersion; // In here it's safe to do export default ValidateAPIVersion, because it's not being used anywhere else.
