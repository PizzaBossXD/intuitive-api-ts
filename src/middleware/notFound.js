const notFound = (req, res, next) => {
    res.status(404);
    const error = new Error(`Page Not Found!`); // Change this error if you want
    next(error);
}

module.exports = notFound;
