import { ErrorRequestHandler } from 'express';

const midError: ErrorRequestHandler = (error, _req, res, _next) => {
  console.log(error);
  if (error.status) {
    return res.status(error.status).json({ message: error.message });
  }
  return res.status(500).json({ message: error.message });
};

export default midError;
