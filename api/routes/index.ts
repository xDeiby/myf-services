import { Express } from 'express';

import userRouter from './user.route';
import experimentRouter from './experiment.route';
import authRouter from './auth.route';
import sectionRouter from './section.route';
import questionRouter from './question.route';
import alternativeRouter from './alternative.router';

const routes = (app: Express) => {
  // app.use('/api', app);
  app.use('/users', userRouter);
  app.use('/experiments', experimentRouter);
  app.use('/sections', sectionRouter);
  app.use('/questions', questionRouter);
  app.use('/alternatives', alternativeRouter);
  app.use('/auth', authRouter);
};

export default routes;
