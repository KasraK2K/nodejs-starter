import BaseController from "../../base/controller/BaseController";
import { Request, Response } from "express";
import postgresLogic from "./logic";
import { IUserList } from "./common/interface";
import { IRes } from "../../common/interfaces/general";

class PostgresController extends BaseController {
  public async list(req: Request, res: Response): Promise<Response<IRes<IUserList>>> {
    return await postgresLogic
      .list(res.locals.params)
      .then((result) => {
        return super.resGen<IUserList>({
          req,
          res,
          result: true,
          data: result.data,
        });
      })
      .catch((err) => {
        return super.resGen({
          req,
          res,
          status: err.code,
          result: err.result,
          error_code: err.error_code,
          error_user_messages: err.errors,
        });
      });
  }

  public async create(req: Request, res: Response): Promise<Response<IRes<IUserList>>> {
    return await postgresLogic
      .create(res.locals.params)
      .then((result) => {
        return super.resGen<IUserList>({
          req,
          res,
          result: true,
          data: result.data,
        });
      })
      .catch((err) => {
        return super.resGen({
          req,
          res,
          status: err.code,
          result: err.result,
          error_code: err.error_code,
          error_user_messages: err.errors,
        });
      });
  }
}

export default new PostgresController();
