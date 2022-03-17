import "./boot/bootstrap";
import cors from "cors";
import express, { Express } from "express";
import helmet from "helmet";
import compression from "compression";
import _ from "lodash";
import config from "config";
import { ICorsConfig } from "./../config/config.interface";
import { locals, globals } from "./common/variabels";
import router from "./gateway/router";
import rateLimiterMiddleware from "./gateway/middleware/RateLimiterMiddleware";
import requestMiddleware from "./gateway/middleware/RequestMiddleware";
import { getUserInformation } from "./common/functions/information";

const corsConfig: ICorsConfig = config.get("cors");

/**
 * # Application
 * ---
 *
 * This class is core of the application. It is responsible for starting the server and handling the requests. To use this class, you need to create an instance of it. The constructor takes an object has port as a number.
 *
 * ```typescript
 * // This is an example of how to use the Application class.
 *
 * const server = new Application();
 * server.start({ port: 3000 });
 * ```
 *
 * @category Application
 */
class Application {
  public app: Express;
  private port: number;

  /**
   * @param options Get some options to constructing core class
   */
  constructor(options: { port: number }) {
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
    this.app.use(compression());
    this.app.disable("x-powered-by");
    this.app.use(
      cors({
        optionsSuccessStatus: 200,
        methods: corsConfig.allow_method,
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
