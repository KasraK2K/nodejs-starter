import express from "express";
import { Express, Request, Response } from "express";
import _ from "lodash";
const { locals, globals } = require("./common/variabels");
import router from "./gateway/router";
import tokenInterceptor from "./gateway/interceptor/TokenInterceptor";
import dotenv from "dotenv";
import { getUserInformation } from "./common/functions/information";

class Application {
  public app: Express;
  private port: Number;

  constructor(options: { port: Number }) {
    const { port } = options;
    this.app = express();
    this.port = Number(process.env.PORT) || port;

    this.config();
    this.middlewares();
    this.routes();
  }

  private config() {
    dotenv.config({
      path:
        process.env.NODE_ENV === "production"
          ? ".env.production"
          : ".env.development",
    });
    this.app.locals = locals;
    _.assign(global, globals);
  }

  private middlewares() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.disable("x-powered-by");
  }

  private routes() {
    this.app.use("*", tokenInterceptor.verify);
    this.app.use("/", router);
  }

  public init() {
    this.app.listen(this.port, () => getUserInformation(this.port));
  }
}

const server = new Application({ port: 3000 });
server.init();
