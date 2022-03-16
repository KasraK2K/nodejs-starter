import Controller from "./Controller";
import { Request, Response } from "express";

class InformationController extends Controller {
  public info(req: Request, res: Response) {
    return super.resGen({
      req,
      res,
      result: true,
      data: { items: [] },
    });
  }
}

export default new InformationController();
