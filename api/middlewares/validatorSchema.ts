import { StatusCode } from '../types';
import { responses } from '../utils';
import { NextFunction, Request, Response } from 'express';
import { AnyObjectSchema } from 'yup';

export const validatorSchema =
  (...schemas: AnyObjectSchema[]) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schemas.forEach((schema) =>
        schema.validateSync({
          body: req.body,
          query: req.query,
          params: req.params,
        })
      );
      next();
    } catch (error) {
      responses.error(res, (error as Error).message, StatusCode.BAD_REQUEST);
    }
  };
