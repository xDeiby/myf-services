import dotenv from 'dotenv';

dotenv.config();

const envConfig = {
  dbUri:
    process.env.DB_URI ??
    '<db>://<username>:<password>@<host>:<port>/<db_name>',
  app: {
    port: process.env.PORT ?? 3001,
    secret: process.env.SECRET as string,
    enviroment: process.env.NODE_ENV ?? 'development',
  },
};

export default envConfig;
