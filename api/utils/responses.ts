import { Response } from 'express';
import { StatusCode } from '../types';

const success = <T>(
  res: Response,
  data: T,
  statusCode: StatusCode = StatusCode.OK
): void => {
  res.status(statusCode).send({
    status: statusCode,
    error: false,
    body: data,
  });
};

const error = (
  res: Response,
  msg = 'Internal server error',
  statusCode: StatusCode = StatusCode.SERVER_ERROR
): void => {
  res.status(statusCode).send({
    status: statusCode,
    error: true,
    body: msg,
  });
};

export default { success, error };
