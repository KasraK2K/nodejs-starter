import Interceptor from "./Interceptor";
import { Request, Response, NextFunction } from "express";
import { verify, IConfigs } from "k2token";

class TokenInterceptor extends Interceptor {
  verify(req: Request, res: Response, next: NextFunction) {
    let token = req.headers["authorization"];
    if (token && token.startsWith("Bearer ")) {
      token = token.slice(7, token.length);
      const configs: IConfigs = {
        secret: process.env.K2Token_SECRET,
        phrase_one: process.env.K2Token_PHRASE_ONE,
        phrase_two: process.env.K2Token_PHRASE_TWO,
      };
      const { valid } = verify(token, configs);

      if (!valid) return res.status(401).json({ error: "Token invalid" });
      else next();
    } else res.status(400).json({ error: "Token missing" });
  }
}

export default new TokenInterceptor();
