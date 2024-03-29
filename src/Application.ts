import "./boot";
import { app, express } from "./boot";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import _ from "lodash";
import config from "config";
import morgan from "morgan";
import errorhandler from "errorhandler";
import { IApplicationConfig, ICorsConfig } from "../config/config.interface";
import { locals, globals } from "./common/variabels";
import router from "./router";
import multipartMiddleware from "./middleware/MultipartMiddleware";
import rateLimiterMiddleware from "./middleware/RateLimiterMiddleware";
import requestMiddleware from "./middleware/RequestMiddleware";
import { getUserInformation } from "./common/functions/information";

const corsConfig: ICorsConfig = config.get("cors");
const appConfig: IApplicationConfig = config.get("application");

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
  private port: number;

  /**
   * @param options Get some options to constructing core class
   */
  constructor(options: { port: number }) {
    const { port } = options;
    this.port = Number(process.env.PORT) || port;

    this.config();
    this.middlewares();
    this.routes();

    console.log(process.env.K2Token_SECRET);
  }

  private config() {
    app.locals = locals;
    _.assign(global, globals);
  }

  private middlewares() {
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(helmet());
    app.use(compression());
    appConfig.logger.morganLog && app.use(morgan("dev"));
    app.disable("x-powered-by");
    app.use(
      cors({
        optionsSuccessStatus: 200,
        methods: corsConfig.allow_method,
        origin: corsConfig.allow_origin,
      })
    );
    app.use(rateLimiterMiddleware.check());
    app.use(multipartMiddleware.extendBody);
    app.use(requestMiddleware.processIdAdder);
    app.use(requestMiddleware.isPost);
    app.use(requestMiddleware.auth);
  }

  private routes() {
    app.use("/", router);
    appConfig.errorHandller && app.use(errorhandler());
  }

  public start() {
    app.listen(this.port, () => getUserInformation(this.port));
  }
}

export default Application;
