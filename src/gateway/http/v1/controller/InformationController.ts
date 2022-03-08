import Controller from "./Controller";
import { Request, Response, NextFunction } from "express";

class InformationController extends Controller {
  public info(req: Request, res: Response, next: NextFunction) {
    // mongo.collection.insertOne({ name: "test" });

    return res.json(infoGen({ message: "coms from information controller" }));
  }
}

export default new InformationController();
