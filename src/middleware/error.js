export default (err, req, res, next) => {
  err.message = err.message || "Internal server error";
  err.statusCode = err.statusCode || 500;

  // console.log(req.url);
  console.log(err.message);

  res.status(err.statusCode).json({
    success: false,
    message: "" + err.message,
  });
};
