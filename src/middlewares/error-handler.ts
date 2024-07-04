// errorHandler.ts

import { Request, Response, NextFunction } from 'express';
import { makeError } from '../utils/error';


const errorHandlerMiddleware = (err: Error, req: Request, res: Response, next: NextFunction) => {
  const { error, statusCode } = makeError(err);
  res.status(statusCode).json(error);
};

export default errorHandlerMiddleware;
