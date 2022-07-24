import { NextFunction, Request, Response } from 'express';
import { responses } from '../utils';

function logError(err: Error, req: Request, res: Response, next: NextFunction) {
  console.error(err);
  next(err);
}

function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const status = (err as any).status;
  if (status) responses.error(res, err.message, status);
  else responses.error(res);
}

export { errorHandler, logError };
