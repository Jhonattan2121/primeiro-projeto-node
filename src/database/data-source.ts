
import { DataSource } from "typeorm";
import "reflect-metadata";
require("dotenv").config();


export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "docker",
  database: "gostack_gobarber",
  //entities: ["./src/models/*.ts"],
  entities: [__dirname + './src/models/*.ts'],
  migrations: ["./src/database/migrations/*.ts"]
});

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
  });