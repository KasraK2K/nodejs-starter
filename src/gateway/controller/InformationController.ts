import Controller from "./Controller";
import { Request, Response, NextFunction } from "express";

class InformationController extends Controller {
  public info(req: Request, res: Response, next: NextFunction) {
    return super.resGen({
      req,
      res,
      result: true,
      data: { items: [] },
    });
  }
}

export default new InformationController();
