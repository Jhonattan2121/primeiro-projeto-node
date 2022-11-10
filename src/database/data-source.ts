/* eslint-disable prettier/prettier */
import { DataSource } from "typeorm";
import "reflect-metadata";
require("dotenv").config();

// eslint-disable-next-line import/prefer-default-export
export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "docker",
  database: "gostack_gobarber",
  entities: ["./src/models/*.ts"],
  synchronize: true,
  logging: true,
  subscribers: [],
  migrations: ["./src/database/migrations/*.ts"],
  
});

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
  });