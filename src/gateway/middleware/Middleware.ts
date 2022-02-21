import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import jwt_decode from "jwt-decode";

class Middleware {
  public isTokenValid(req: Request, res: Response, next: NextFunction) {
    // const token = req.headers.authorization || "";
    // const decode = jwt_decode(token);

    // const token2 = req.headers["x-access-token"] || "";

    // if (!token) {
    //   return res.status(401).json({ message: "Unauthorized" });
    // }

    // try {
    //   const decoded = jwt.verify(token, process.env.JWT_SECRET);

    //   req.user = decoded;
    // } catch (error) {
    //   return res.status(401).json({ message: "Unauthorized" });
    // }

    next();
  }
}

export default Middleware;
