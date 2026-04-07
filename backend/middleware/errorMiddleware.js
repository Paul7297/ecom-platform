// eslint-disable-next-line no-unused-vars
const errorMiddleware = (err, req, res, next) => {
  const status = err.statusCode || 500;
  const message = err.message || 'Server error';
  console.error(err);
  res.status(status).json({ message });
};

module.exports = errorMiddleware;
