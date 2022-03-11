import Controller from "./Controller";
import { Request, Response, NextFunction } from "express";
import userLogic from "../../domain/logic/UserLogic";

class UserController extends Controller {
  public async create(req: Request, res: Response, next: NextFunction) {
    await userLogic
      .create(req)
      .then((response) =>
        super.resGen({
          req,
          res,
          result: true,
          data: response.data,
        })
      )
      .catch((err) =>
        super.resGen({
          req,
          res,
          status: 500,
          result: false,
          error_code: err.error_code,
          error_user_messages: [err.message],
        })
      );
  }
}

export default new UserController();
