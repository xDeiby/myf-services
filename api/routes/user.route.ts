import express from 'express';
import multer from 'multer';

import { validatorSchema } from '../middlewares';
import {
  userGetOrDeleteSchema,
  userPostSchema,
  userPutSchema,
} from '../schemas';

import { storage } from '../../config/multer.conf';
import { UserService } from '../services';
import { StatusCode } from '../types';
import { responses } from '../utils';
import path from 'path';

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

const userRouter = express.Router();
const userService = new UserService();

userRouter.get('/', async (req, res, next) => {
  try {
    const users = await userService.list();

    responses.success(res, users);
  } catch (error) {
    next(error);
  }
});

userRouter.get(
  '/:id',
  validatorSchema(userGetOrDeleteSchema),
  // passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const id = Number(req.params.id);
      const user = await userService.find(id);

      responses.success(res, user);
    } catch (error) {
      next(error);
    }
  }
);
// ! Imagen se crea aunque falle el Schema
userRouter.post(
  '/',
  uploads.single('avatar'),
  validatorSchema(userPostSchema),
  async (req, res, next) => {
    try {
      if (req.file) req.body.avatar = req.file.path;

      const user = await userService.create(req.body);

      responses.success(res, user, StatusCode.CREATED);
    } catch (error) {
      next(error);
    }
  }
);

userRouter.put(
  '/:id',
  validatorSchema(userPutSchema),
  uploads.single('avatar'),
  async (req, res, next) => {
    try {
      const id = Number(req.params.id);
      if (req.file) req.body.avatar = req.file.path;

      const user = await userService.update(id, req.body);

      responses.success(res, user);
    } catch (error) {
      next(error);
    }
  }
);

userRouter.delete(
  '/:id',
  validatorSchema(userGetOrDeleteSchema),
  async (req, res, next) => {
    try {
      const id = Number(req.params.id);
      const user = await userService.remove(id);

      responses.success(res, user);
    } catch (error) {
      next(error);
    }
  }
);

export default userRouter;
