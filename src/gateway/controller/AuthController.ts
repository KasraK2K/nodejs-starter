import Controller from "./Controller";
import { Request, Response, NextFunction } from "express";
import authLogic from "../../domain/logic/AuthLogic";

class AuthController extends Controller {
  public async login(req: Request, res: Response, next: NextFunction) {
    authLogic
      .login(res.locals.params)
      .then((response) => super.resGen({ req, res, result: true, data: response }))
      .catch((err) =>
        super.resGen({
          req,
          res,
          status: err.code,
          result: false,
          error_code: 14176,
          error_user_messages: [err.message],
        })
      );
  }
}

export default new AuthController();
