import Middleware from "./Middleware";
import { Request, Response, NextFunction } from "express";

class RequestMiddleware extends Middleware {
  public isPost(req: Request, res: Response, next: NextFunction) {
    if (req.method !== "POST") {
      return res.status(405).json({ message: "Method not allowed" });
    }

    next();
  }
}

export default new RequestMiddleware();
