import express from 'express';
import passport from 'passport';
import multer from 'multer';
import path from 'path';

import { validatorSchema } from '../middlewares';
import {
  experimentGetOrDeleteSchema,
  experimentPostSchema,
  experimentPutSchema,
  sectionGetOrDelete,
} from '../schemas';
import { ExperimentService } from '../services';
import { StatusCode } from '../types';
import { responses } from '../utils';
import { storage } from '../../config/multer.conf';

const experimentRouter = express.Router();
const experimentService = new ExperimentService();

const uploads = multer({
  storage,
  limits: { fileSize: 1_000_000 },
  fileFilter: (req, file, cb) => {
    const fileFormats = /jpeg|jpg|png|gif/;
    const mimeType = fileFormats.test(file.mimetype);
    const extName = fileFormats.test(path.extname(file.originalname));

    if (mimeType && extName) {
      return cb(null, true);
    }

    cb(new Error('avatar invalid format'));
  },
});

experimentRouter.get('/', async (req, res, next) => {
  try {
    const experiments = await experimentService.list();
    responses.success(res, experiments);
  } catch (error) {
    next(error);
  }
});

experimentRouter.get(
  '/:id',
  validatorSchema(experimentGetOrDeleteSchema),
  async (req, res, next) => {
    try {
      const experiment = await experimentService.find(Number(req.params.id), {
        relations: req.query?.relations as string,
      });
      responses.success(res, experiment);
    } catch (error) {
      next(error);
    }
  }
);

experimentRouter.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  uploads.single('image'),
  validatorSchema(experimentPostSchema),
  async (req, res, next) => {
    try {
      const payload = req.user as { sub: number };
      if (req.file) req.body.image = req.file.path;

      const experiment = await experimentService.create(req.body, payload.sub);
      responses.success(res, experiment, StatusCode.CREATED);
    } catch (error) {
      next(error);
    }
  }
);

experimentRouter.patch(
  '/:id',
  uploads.single('image'),
  validatorSchema(experimentPutSchema),
  async (req, res, next) => {
    try {
      if (req.file) req.body.image = req.file.path;

      const experiment = await experimentService.update(
        Number(req.params.id),
        req.body
      );
      responses.success(res, experiment);
    } catch (error) {
      next(error);
    }
  }
);

experimentRouter.delete(
  '/:id',
  validatorSchema(experimentGetOrDeleteSchema),
  async (req, res, next) => {
    try {
      const experiment = await experimentService.remove(Number(req.params.id));
      responses.success(res, experiment);
    } catch (error) {
      next(error);
    }
  }
);

export default experimentRouter;
