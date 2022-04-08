import BaseController from "../../base/controller/BaseController";
import { Request, Response } from "express";
import mongoDbLogic from "./logic";
import { IUserList } from "./utils/interface";
import { IRes } from "../../common/interfaces/general.interface";

class MongoDbController extends BaseController {
  public async selectAll(req: Request, res: Response): Promise<Response<IRes<IUserList>>> {
    return await mongoDbLogic
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
    return await mongoDbLogic
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
    return await mongoDbLogic
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
    return await mongoDbLogic
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
    return await mongoDbLogic
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
    return await mongoDbLogic
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
    return await mongoDbLogic
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
    return await mongoDbLogic
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
}

export default new MongoDbController();
