import Controller from "./Controller";
import { Request, Response, NextFunction } from "express";

class HomeController extends Controller {
  public index(req: Request, res: Response, next: NextFunction) {
    super.logger();

    return res.json({ message: "Hello World!" });
  }
}

export default new HomeController();
