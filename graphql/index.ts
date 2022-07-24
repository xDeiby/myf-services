import { Express } from 'express';
import { ApolloServer } from 'apollo-server-express';
import { createApplication } from 'graphql-modules';
import jwt from 'jsonwebtoken';

import envConfig from '../config/env.conf';
import UserModule from './user';
import ExperimentModule from './experiment';

const application = createApplication({
  modules: [UserModule, ExperimentModule],
});

async function startServer(app: Express) {
  const server = new ApolloServer({
    executor: application.createApolloExecutor(),
    schema: application.schema,
    context: ({ req }) => {
      try {
        const token = req.headers.authorization?.replace('Bearer', '');

        if (token) {
          const payload = jwt.verify(token.trim(), envConfig.app.secret);

          return { user: payload };
        }
      } catch (error) {
        console.error(error);
      }
    },
  });

  await server.start();
  server.applyMiddleware({ app });

  return server;
}

export default startServer;
