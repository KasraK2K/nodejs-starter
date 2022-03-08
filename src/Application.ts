import "./boot/bootstrap";
import cors from "cors";
import express, { Express } from "express";
import _ from "lodash";
const { locals, globals } = require("./common/variabels");
import router from "./gateway/router";
import requestMiddleware from "./gateway/middleware/RequestMiddleware";
import tokenInterceptor from "./gateway/interceptor/TokenInterceptor";
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
    this.app.locals = locals;
    _.assign(global, globals);
  }

  private middlewares() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    // helmet comes here
    this.app.disable("x-powered-by");
    this.app.use(
      cors({
        optionsSuccessStatus: 200,
        methods: process.env.CORS_ALLOW_METHODS?.split(","),
        origin: process.env.CORS_ALLOW_ORIGIN?.split(","),
      })
    );
    if (process.env.NODE_ENV === "production") {
      this.app.use(requestMiddleware.isPost);
      this.app.use(tokenInterceptor.verify);
    }
  }

  private routes() {
    this.app.use("/", router);
  }

  public start() {
    this.app.listen(this.port, () => getUserInformation(this.port));
  }
}

export default Application;
