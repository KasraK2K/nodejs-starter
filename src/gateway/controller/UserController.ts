import Controller from "./Controller";
import { Request, Response, NextFunction } from "express";
import UserLogic from "../../domain/logic/UserLogic";
import UserRepository from "../../domain/repository/UserRepository";

class UserController extends Controller {
  constructor(private userLogic: UserLogic) {
    super();
    this.userLogic = userLogic;
  }

  public async create(req: Request, res: Response, next: NextFunction) {
    await this.userLogic
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

export default new UserController(new UserLogic(new UserRepository()));
