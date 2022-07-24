import { validatorSchema } from '../middlewares';
import { sectionPostSchema, sectionPutSchema } from '../schemas';
import express from 'express';

import { responses } from '../utils';
import SectionService from '../../api/services/section.service';

const sectionRouter = express.Router();

sectionRouter.post(
  '/',
  validatorSchema(sectionPostSchema),
  async (req, res, next) => {
    try {
      const section = await SectionService.create(req.body);

      responses.success(res, section);
    } catch (error) {
      next(error);
    }
  }
);

sectionRouter.put(
  '/:id',
  validatorSchema(sectionPutSchema),
  async (req, res, next) => {
    try {
      const section = await SectionService.update(
        Number(req.params.id),
        req.body
      );

      responses.success(res, section);
    } catch (error) {
      next(error);
    }
  }
);

export default sectionRouter;
