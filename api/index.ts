import express from 'express';
import cors from 'cors';

import envConfig from '../config/env.conf';
import corsOptions from '../config/cors.conf';
import routes from './routes';
import connectDb from '../db';
import { errorHandler, logError } from './middlewares';
import startServer from '../graphql';

import './auth';

async function api() {
  const app = express();

  // Connection Db
  connectDb();

  // GrapQl server
  const apolloServer = await startServer(app);

  // Middlewares
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors(corsOptions));
  app.use('/uploads', express.static('./uploads'));

  // Routes
  routes(app);

  // Middlewares errors
  app.use(logError);
  app.use(errorHandler);

  // App
  app.listen(envConfig.app.port, () => {
    console.log(`Server is ready on http://localhost:${envConfig.app.port}`);
    console.log(
      `GraphQL server is ready on http://localhost:${envConfig.app.port}${apolloServer.graphqlPath}`
    );
  });
}

api();
