const errorHandlerMiddleware = (error, req, res, next) => {
  res.status(400).json({ errorMessage: "Upload File Must be less than 10MB" });
};

module.exports = errorHandlerMiddleware;
