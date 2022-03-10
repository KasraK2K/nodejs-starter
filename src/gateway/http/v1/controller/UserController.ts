import Controller from "./Controller";
import { Request, Response, NextFunction } from "express";
import userLogic from "../../../../domain/v1/logic/UserLogic";

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
          result: false,
          error_code: err.error_code,
          error_user_messages: err.error_user_messages,
        })
      );
  }
}

export default new UserController();
