import BaseController from "../../base/controller/BaseController";
import { Request, Response } from "express";
import { IResGenOptions } from "../../common/interfaces/information";
import postgresLogic from "./logic";
import { QueryResult } from "pg";

class PostgresController extends BaseController {
  public async list(req: Request, res: Response) {
    const result: QueryResult<any> = await postgresLogic.list();
    const resData: IResGenOptions = { req, res, result: true, data: result };
    return super.resGen(resData);
  }
}

export default new PostgresController();
