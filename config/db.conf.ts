import envConfig from './env.conf';

module.exports = {
  development: {
    url: envConfig.dbUri,
    dialect: 'postgres',
  },
  production: {
    url: envConfig.dbUri,
    dialect: 'postgres',
  },
};
