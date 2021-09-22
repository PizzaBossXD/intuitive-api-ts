const Versions = require("../api/APIVersions.json");
const fs = require("fs");
const deprecatedVersions = Versions.deprecatedVersions || [];

const ValidateAPIVersion = (req, res, next) => {
    try {
        const checkVersion = fs.readdirSync(`./src/api/versions/v${req.params.version}`) || null;
    
        if (checkVersion === null || isNaN(req.params.version)) {
            res.status(404);
            const error = new Error(`Invalid API Version!`);
            next(error);
        } else if (deprecatedVersions.find((foundVersion) => {return foundVersion === parseInt(req.params.version);})) {
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
}

module.exports = ValidateAPIVersion;
