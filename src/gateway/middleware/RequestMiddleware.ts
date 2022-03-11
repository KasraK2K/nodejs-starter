import Middleware from "./Middleware";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import Controller from "../controller/Controller";
import _ from "lodash";
import { LoggerEnum } from "../../common/enums/logger.enum";

class RequestMiddleware extends Middleware {
  constructor(private controller: Controller) {
    super();
  }

  public isPost(req: Request, res: Response, next: NextFunction) {
    if (req.method !== "POST") {
      return res.status(405).json({ message: "Method not allowed" });
    }
    next();
  }

  public auth(req: Request, res: Response, next: NextFunction) {
    const apiKeys = process.env.API_KEYS?.split(",") || [];
    const ignoreToken = ["user/login", "user/logout"];
    const endpoint = req.originalUrl;
    const params = req.body;
    const checkToken = !ignoreToken.some((ignoreTkn) =>
      endpoint.includes(ignoreTkn)
    );
    let portal_user_id = 0;

    // ───────────────────────────────── IF PARAMS HAS NOT API KEY ─────
    if (!params.api_key || !apiKeys.includes(params.api_key)) {
      logger("{red}api_key is not verify{reset}", LoggerEnum.ERROR);
      return this.controller.resGen({
        req,
        res,
        result: false,
        error_code: 3004,
      });
    }

    if (checkToken) {
      const jwtPayload = RequestMiddleware.getJwtPayload(req);

      // ─────────────────────── IF JESON WEB TOKEN VARIFY HAS ERROR ─────
      if (!jwtPayload.result) {
        logger("{red}token is not verify{reset}", LoggerEnum.ERROR);
        return this.controller.resGen({
          req,
          res,
          result: false,
          error_code: 3004,
        });
      } else {
        portal_user_id = jwtPayload?.data?.user_id || 0;
        params.venue_ids = jwtPayload?.data?.venue_ids || "";
        params.portal_user_id = portal_user_id;
        res.locals.params = params;
        next();
      }
    } else next();
  }

  private static getJwtPayload(req: Request) {
    const token = req.headers.authorization
      ? req.headers.authorization.slice(7)
      : "";
    const returnValue: Record<string, any> = {};

    jwt.verify(token, process.env.JWT_SECRET!, (err, decoded) => {
      if (err) returnValue.result = false;
      else {
        returnValue.result = true;
        returnValue.data = {};

        typeof decoded === "object" &&
          _.keys(decoded).length &&
          _.assign(returnValue.data, decoded);
      }
    });

    return returnValue;
  }
}

export default new RequestMiddleware(new Controller());
