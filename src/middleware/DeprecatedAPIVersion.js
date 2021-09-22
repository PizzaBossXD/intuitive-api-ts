const DeprecatedAPIVersion = (req, res, next) => {
    res.status(404);
    const error = new Error(`Deprecated API Version!`);
    next(error);
}

module.exports = DeprecatedAPIVersion;
