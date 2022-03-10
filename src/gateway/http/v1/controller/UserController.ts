import Controller from "./Controller";
import { Request, Response, NextFunction } from "express";
import userLogic from "../../../../domain/v1/logic/UserLogic";

class UserController extends Controller {
  public async create(req: Request, res: Response, next: NextFunction) {
    await userLogic
      .create(req)
      .then((response) => res.json(super.resGen(response)))
      .catch((err) =>
        res.json(
          super.resGen({
            req,
            result: false,
            error_code: err.error_code,
            error_user_messages: err.error_user_messages,
          })
        )
      );
  }
}

export default new UserController();
