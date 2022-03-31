const errorHandler = (err, req, res, next) => {
  res.status(res.statusCode !== 200 ? res.statusCode : 500);
  res.send({
    message: err.message,
    stack:
      process.env.NODE_ENV === "production" || !err.stack ? `Error` : err.stack,
  });
};

export default errorHandler; // In here it's safe to do export default errorHandler, because it's not being used anywhere else.
