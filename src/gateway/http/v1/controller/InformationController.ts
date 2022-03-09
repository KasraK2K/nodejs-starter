import Controller from "./Controller";
import { Request, Response, NextFunction } from "express";

class InformationController extends Controller {
  public info(req: Request, res: Response, next: NextFunction) {
    return res.json(
      super.resGen({
        req,
        success: true,
        data: { items: [] },
      })
    );
  }
}

export default new InformationController();
