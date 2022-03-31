const DeprecatedAPIVersion = (req, res, next) => {
  res.status(404);
  const error = new Error(`Deprecated API Version!`);
  next(error);
};

module.exports = DeprecatedAPIVersion; // Never do export default DeprecatedAPIVersion, that won't work, just keep doing the safe module.exports = DeprecatedAPIVersion method.
