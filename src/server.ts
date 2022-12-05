import 'reflect-metadata'
import routes from "./routes";

import "./database";
import express = require("express");

const app = express();

app.use(express.json());
app.use(routes);

app.listen(3333, () => {
  
  console.log("server iniciado 3333");
});