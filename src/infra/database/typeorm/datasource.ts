/* eslint-disable no-console */

const { DataSource } = require('typeorm');

export const AppDataSource = new DataSource({
  type: process.env.DATABASE_TYPE,
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_DATABASE,
  synchronize: true,
  logging: true,
  entities: ['src/infra/typeorm/models/*.ts'],
  subscribers: [],
  migrations: ['src/infra/typeorm/migrations/*.ts'],
});

AppDataSource.initialize().then(() => {
  console.log('Data Source has been initialized!');
})
  .catch((err: Error) => {
    console.error('Error during Data Source initialization', err);
  });
