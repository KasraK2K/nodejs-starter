import BaseController from "../../base/controller/BaseController";
import { Request, Response } from "express";
import postgresLogic from "./logic";
import { IUserList } from "./common/interface";
import { IRes } from "../../common/interfaces/information";

class PostgresController extends BaseController {
  public async list(req: Request, res: Response): Promise<Response<IRes<IUserList>>> {
    return await postgresLogic
      .list()
      .then((result) =>
        super.resGen<IUserList>({
          req,
          res,
          result: true,
          data: result,
        })
      )
      .catch((err) =>
        super.resGen({
          req,
          res,
          status: err.code ?? 401,
          result: err.result,
          error_code: err.error_code ?? 3000,
          error_user_messages: err.errors ?? [],
        })
      );
  }
}

export default new PostgresController();
