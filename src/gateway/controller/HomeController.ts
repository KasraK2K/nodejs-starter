import Controller from "./Controller";
import { Request, Response } from "express";

class HomeController extends Controller {
  public index(req: Request, res: Response) {
    super.logger();

    // mongo.collection.insertOne({ name: "test" });

    return res.json({ message: "Hello World!" });
  }
}

export default new HomeController();
