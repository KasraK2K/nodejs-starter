import "./boot/bootstrap";
import cors from "cors";
import express, { Express } from "express";
import helmet from "helmet";
import _ from "lodash";
import config from "config";
import { ICorsConfig } from "./../config/config.interface";
import { locals, globals } from "./common/variabels";
import router from "./gateway/router";
import rateLimiterMiddleware from "./gateway/middleware/RateLimiterMiddleware";
import requestMiddleware from "./gateway/middleware/RequestMiddleware";
import { getUserInformation } from "./common/functions/information";

const corsConfig: ICorsConfig = config.get("cors");

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
    this.app.locals = locals;
    _.assign(global, globals);
  }

  private middlewares() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(helmet());
    this.app.disable("x-powered-by");
    this.app.use(
      cors({
        optionsSuccessStatus: 200,
        methods: corsConfig.allow_methods,
        origin: corsConfig.allow_origin,
      })
    );
    this.app.use(rateLimiterMiddleware.check());
    this.app.use(requestMiddleware.isPost);
    this.app.use(requestMiddleware.auth);
  }

  private routes() {
    this.app.use("/", router);
  }

  public start() {
    this.app.listen(this.port, () => getUserInformation(this.port));
  }
}

export default Application;
