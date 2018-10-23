import "reflect-metadata";
import { ApiServer } from './server/Router';
import { createConnection } from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";

createConnection().then(async connection => {

  const server = new ApiServer();
  server.start(+process.env.PORT || 8000);

    const app = express();
    app.use(bodyParser.json());
});