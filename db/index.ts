import { Sequelize, Options } from 'sequelize';

import config from '../config/env.conf';
import setupModels from './models';

const options: Options = {
  dialect: 'postgres',
  logging: console.log,
};

if (config.app.enviroment === 'production') {
  options.dialectOptions = {
    ssl: {
      rejectUnauthorized: false,
    },
  };
}

const sequelizeConnection = new Sequelize(config.dbUri, options);

// Definition models
setupModels(sequelizeConnection);

function connectDb() {
  sequelizeConnection
    .authenticate()
    .then(() => console.log('Connection has been established successfully'))
    .catch((error) => console.error(error));
}

export default connectDb;
