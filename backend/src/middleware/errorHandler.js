// Custom error handler middleware
const errorHandler = (err, req, res, next) => {
  // Set status code to 500 if not already set
  const statusCode = res.statusCode ? res.statusCode : 500;
  // Respond with status code, error message, and stack trace if not in production
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
  // Log the error to the console for debugging
  console.error(err);
  // Pass the error to the next middleware
  next();
};

export default errorHandler;
