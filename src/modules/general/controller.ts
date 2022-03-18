import BaseController from "../../base/controller/BaseController";
import { Request, Response } from "express";
import { IResGenOptions } from "../../common/interfaces/information";

class GeneralController extends BaseController {
  public shakeHand(req: Request, res: Response) {
    const resData: IResGenOptions = { req, res, result: true, data: { items: [] } };
    return super.resGen(resData);
  }
}

export default new GeneralController();
