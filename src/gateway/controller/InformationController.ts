import Controller from "./Controller";
import { Request, Response, NextFunction } from "express";
import { LoggerEnum } from "../../common/enums/logger.enum";

class InformationController extends Controller {
  public info(req: Request, res: Response, next: NextFunction) {
    logger(`{blue}${req.originalUrl}{reset}`, LoggerEnum.REQUEST);
    return super.resGen({
      req,
      res,
      result: true,
      data: { items: [] },
    });
  }
}

export default new InformationController();
