import BaseController from "../../base/controller/BaseController";
import { Request, Response } from "express";
import { IResGenOptions } from "../../common/interfaces/general.interface";

class GeneralController extends BaseController {
  public shakeHand(req: Request, res: Response) {
    const resData: IResGenOptions<any> = { req, res, result: true, data: {} };
    return super.resGen(resData);
  }
}

export default new GeneralController();
