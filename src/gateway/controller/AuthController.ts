import Controller from "./Controller";
import { Request, Response } from "express";
import authLogic from "../../domain/logic/AuthLogic";

class AuthController extends Controller {
  public async login(req: Request, res: Response) {
    return await authLogic
      .login(res.locals.params)
      .then((response) => super.resGen({ req, res, result: response.result, data: response.data }))
      .catch((err) =>
        super.resGen({
          req,
          res,
          status: 200,
          result: err.result,
          error_code: err.error_code ?? 3000,
          error_user_messages: err.errors ?? [],
        })
      );
  }
}

export default new AuthController();
