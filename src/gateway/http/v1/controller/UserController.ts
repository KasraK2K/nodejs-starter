import Controller from "./Controller";
import { Request, Response, NextFunction } from "express";
import userLogic from "../../../../domain/v1/logic/UserLogic";

class UserController extends Controller {
  public async create(req: Request, res: Response, next: NextFunction) {
    const result = await userLogic.create(req);

    return res.json(super.resGen(result));
  }
}

export default new UserController();
