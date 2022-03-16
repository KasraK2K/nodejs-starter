import Interceptor from "./Interceptor";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

class TokenInterceptor extends Interceptor {
  verify(req: Request, res: Response, next: NextFunction) {
    let token = req.headers["authorization"];
    if (token && token.startsWith("Bearer ")) {
      token = token.slice(7, token.length);
      jwt.verify(token, process.env.JWT_SECRET ?? "", (err) => {
        if (err) return res.status(401).json({ error: "Token invalid" });
        else next();
      });
    } else res.status(400).json({ error: "Token missing" });
  }
}

export default new TokenInterceptor();
