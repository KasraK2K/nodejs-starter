import BaseController from "../../base/controller/BaseController";
import { Request, Response } from "express";
import firebaseLogic from "./logic";
import { IRes } from "../../common/interfaces/general.interface";

class FirebaseController extends BaseController {
  public async sendMessage(req: Request, res: Response) {
    return await firebaseLogic
      .selectAll(req.body)
      .then((response) => {
        return super.resGen({
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

export default new FirebaseController();
