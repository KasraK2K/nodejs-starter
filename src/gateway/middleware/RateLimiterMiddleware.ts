import Middleware from "./Middleware";
import rateLimit from "express-rate-limit";
import Controller from "../controller/Controller";

class RateLimiterMiddleware extends Middleware {
  constructor(private controller: Controller) {
    super();
  }

  check() {
    return rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limit each IP to 100 requests per 15 minutes
      standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
      legacyHeaders: false, // Disable the `X-RateLimit-*` headers
      handler: (req, res) => {
        this.controller.resGen({
          req,
          res,
          result: false,
          status: 429,
          error_code: 3006,
        });
      },
    });
  }
}

export default new RateLimiterMiddleware(new Controller());
