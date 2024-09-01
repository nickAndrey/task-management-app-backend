import { NextFunction, Request, Response } from 'express';
import CustomError from '../utils/custom-error';

const errorHandler = async (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof CustomError) {
    res.status(err.statusCode).json({ data: [err.errorDetails], success: false, msg: err.message });
  } else {
    res.status(500).json({ data: [], success: false, msg: 'Internal Server Error' });
  }

  next();
};

export default errorHandler;
