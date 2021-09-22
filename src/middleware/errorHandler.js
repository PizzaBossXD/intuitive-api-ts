const errorHandler = (err, req, res, next) => {
    res.status(res.statusCode !== 200 ? res.statusCode : 500);
    res.send({
      message: err.message,
      stack: (process.env.NODE_ENV === "production" || !err.stack) ? `Error` : err.stack
    });
}

module.exports = errorHandler;
