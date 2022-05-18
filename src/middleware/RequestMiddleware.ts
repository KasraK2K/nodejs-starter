import Middleware from "./Middleware";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import BaseController from "../base/controller/BaseController";
import _ from "lodash";
import { LoggerEnum } from "../common/enums/logger.enum";

class RequestMiddleware extends Middleware {
  processIdAdder(req: Request, res: Response, next: NextFunction) {
    const process_id = (+new Date() + Math.floor(Math.random() * (999 - 100) + 100)).toString(16);
    _.assign(global, { process_id });
    _.assign(res.locals, { params: { process_id } });
    next();
  }

  public isPost(req: Request, res: Response, next: NextFunction) {
    const controller = new BaseController();
    _.assign(res.locals, { params: { process_id } });

    logger(`{blue}[${req.method}]: ${req.originalUrl}{reset}`, LoggerEnum.REQUEST);

    const ignoreCheckMethod: string[] = ["swagger"];
    const endpoint = req.originalUrl;
    const checkToken = !ignoreCheckMethod.some((ignoreTkn) => endpoint.includes(ignoreTkn));

    if (req.method !== "POST" && checkToken) {
      logger("{red}method is not POST{reset}", LoggerEnum.ERROR);
      return controller.resGen({
        req,
        res,
        result: false,
        status: 405,
        error_code: 3005,
      });
    }
    next();
  }

  public auth(req: Request, res: Response, next: NextFunction) {
    const controller = new BaseController();
    const apiKeys = process.env.API_KEYS?.split(",") || [];
    const ignoreApikeys: string[] = ["swagger"];
    const ignoreToken: string[] = ["login", "logout", "shake-hand", "swagger"];
    const endpoint = req.originalUrl;
    const params = req.body;
    _.assign(res.locals.params, params);

    const checkApiKey = !ignoreApikeys.some((ignoreApiKey) => endpoint.includes(ignoreApiKey));
    const checkToken = !ignoreToken.some((ignoreTkn) => endpoint.includes(ignoreTkn));

    // ───────────────────────────────── IF PARAMS HAS NOT API KEY ─────
    if (checkApiKey && (!params.api_key || !apiKeys.includes(params.api_key))) {
      logger("{red}api_key is not verify{reset}", LoggerEnum.ERROR);
      return controller.resGen({
        req,
        res,
        status: 401,
        result: false,
        error_code: 3004,
      });
    }

    if (checkToken) {
      const jwtPayload = RequestMiddleware.getJwtPayload(req);

      // ─────────────────────── IF JESON WEB TOKEN VARIFY HAS ERROR ─────
      if (!jwtPayload.result) {
        logger("{red}token is not verify{reset}", LoggerEnum.ERROR);
        return controller.resGen({
          req,
          res,
          status: 401,
          result: false,
          error_code: 3004,
        });
      } else {
        _.assign(res.locals, { jwt_payload: jwtPayload.data });
        next();
      }
    } else {
      next();
    }
  }

  private static getJwtPayload(req: Request) {
    const token = req.headers.authorization ? req.headers.authorization.slice(7) : "";
    const returnValue: Record<string, any> = {};

    jwt.verify(token, process.env.JWT_SECRET ?? "", (err, decoded) => {
      if (err) returnValue.result = false;
      else {
        returnValue.result = true;
        returnValue.data = {};

        typeof decoded === "object" && _.keys(decoded).length && _.assign(returnValue.data, decoded);
      }
    });

    return returnValue;
  }
}

export default new RequestMiddleware();
