/* eslint-disable prettier/prettier */

import { AppDataSource } from "./data-source";

AppDataSource.initialize().then(() => {
  console.log("Database connected");
}).catch((error) => {
  console.log("Error connecting to database", error);
});