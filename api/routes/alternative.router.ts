import { validatorSchema } from '../../api/middlewares';
import {
  alternativePostSchema,
  alternativePutSchema,
} from '../../api/schemas/alternative.schema';
import AlternativeService from '../../api/services/alternative.service';
import { StatusCode } from '../../api/types';
import { responses } from '../../api/utils';
import express from 'express';

const alternativeRouter = express.Router();

alternativeRouter.post(
  '/',
  validatorSchema(alternativePostSchema),
  async (req, res, next) => {
    try {
      const alternative = await AlternativeService.create(req.body);

      responses.success(res, alternative, StatusCode.CREATED);
    } catch (error) {
      next(error);
    }
  }
);

alternativeRouter.put(
  '/:id',
  validatorSchema(alternativePutSchema),
  async (req, res, next) => {
    try {
      const alternative = await AlternativeService.update(
        Number(req.params.id),
        req.body
      );

      responses.success(res, alternative);
    } catch (error) {
      next(error);
    }
  }
);

export default alternativeRouter;
