const notFound = (req, res, next) => {
  res.status(404);
  const error = new Error(`Page Not Found!`); // Change this error if you want
  next(error);
};

export default notFound; // In here it's safe to do export default notFound, because it's not being used anywhere else.
