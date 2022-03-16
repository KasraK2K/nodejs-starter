import Controller from "./Controller";
import { Request, Response } from "express";

class UserController extends Controller {
  public async create(req: Request, res: Response) {
    return res.json({ params: res.locals.params });
  }
}

export default new UserController();
