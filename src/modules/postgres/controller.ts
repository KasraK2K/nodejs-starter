import BaseController from "../../base/controller/BaseController";
import { Request, Response } from "express";
import postgresLogic from "./logic";
import { IUserList } from "./utils/interface";
import { IRes } from "../../common/interfaces/general.interface";

class PostgresController extends BaseController {
  public async selectAll(req: Request, res: Response): Promise<Response<IRes<IUserList>>> {
    return await postgresLogic
      .selectAll(req.body)
      .then((response) => {
        return super.resGen<IUserList>({
          req,
          res,
          result: response.result,
          data: response.data,
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

  public async selectOne(req: Request, res: Response): Promise<Response<IRes<IUserList>>> {
    return await postgresLogic
      .selectOne(req.body)
      .then((response) => {
        return super.resGen<IUserList>({
          req,
          res,
          result: response.result,
          data: response.data,
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
      .create(req.body)
      .then((response) => {
        return super.resGen<IUserList>({
          req,
          res,
          result: response.result,
          data: response.data,
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

  public async edit(req: Request, res: Response): Promise<Response<IRes<IUserList>>> {
    return await postgresLogic
      .edit(req.body)
      .then((response) => {
        return super.resGen<IUserList>({
          req,
          res,
          result: response.result,
          data: response.data,
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

  public async upsert(req: Request, res: Response): Promise<Response<IRes<IUserList>>> {
    return await postgresLogic
      .upsert(req.body)
      .then((response) => {
        return super.resGen<IUserList>({
          req,
          res,
          result: response.result,
          data: response.data,
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

  public async safeRemove(req: Request, res: Response): Promise<Response<IRes<IUserList>>> {
    return await postgresLogic
      .safeRemove(req.body)
      .then((response) => {
        return super.resGen<IUserList>({
          req,
          res,
          result: response.result,
          data: response.data,
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

  public async remove(req: Request, res: Response): Promise<Response<IRes<IUserList>>> {
    return await postgresLogic
      .remove(req.body)
      .then((response) => {
        return super.resGen<IUserList>({
          req,
          res,
          result: response.result,
          data: response.data,
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

  public async recover(req: Request, res: Response): Promise<Response<IRes<IUserList>>> {
    return await postgresLogic
      .recover(req.body)
      .then((response) => {
        return super.resGen<IUserList>({
          req,
          res,
          result: response.result,
          data: response.data,
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

  public async testBuilder(req: Request, res: Response) {
    return await postgresLogic
      .testBuilder()
      .then((response) => {
        return super.resGen<IUserList>({
          req,
          res,
          result: response.result,
          data: response.data,
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
