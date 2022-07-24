import { validatorSchema } from '../middlewares';
import { loginSchema } from '../schemas';
import express from 'express';
import passport from 'passport';

import { AuthService, UserService } from '../services';
import { IUser } from '../types';
import { responses } from '../utils';

const authRouter = express.Router();

authRouter.post(
  '/login',
  validatorSchema(loginSchema),
  passport.authenticate('local', {
    session: false,
  }),
  (req, res, next) => {
    try {
      const user = req.user as IUser;
      const token = AuthService.signToken(user);

      responses.success(res, { user, token });
    } catch (error) {
      next(error);
    }
  }
);

authRouter.get(
  '/session',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const userService = new UserService();
      const payload = req.user as { user: { sub: number } };

      const user = await userService.find(payload.user.sub);

      responses.success(res, user);
    } catch (error) {
      next(error);
    }
  }
);

export default authRouter;
