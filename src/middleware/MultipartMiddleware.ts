import Middleware from "./Middleware";
import { Request, Response, NextFunction } from "express";
import _ from "lodash";
import formidable from "formidable";
import Controller from "../base/controller/BaseController";

class MultipartMiddleware extends Middleware {
  extendBody(req: Request, res: Response, next: NextFunction) {
    if ((req.headers["content-type"] ?? "").startsWith("multipart/form-data")) {
      const form = formidable({ multiples: true });

      form.parse(req, (err, fields, files) => {
        if (err) {
          return new Controller().resGen({
            req,
            res,
            status: 404,
            result: false,
            error_code: 3000,
            error_user_messages: err,
          });
        }

        _.assign(req.body, fields);
        _.assign(req.body, { files });

        next();
      });
    } else next();
  }
}

export default new MultipartMiddleware();
