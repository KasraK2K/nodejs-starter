import Middleware from "./Middleware";
import { Request, Response, NextFunction } from "express";

class RequestMiddleware extends Middleware {
  public isPost(req: Request, res: Response, next: NextFunction) {
    if (req.method !== "POST") {
      return res.status(405).json({ message: "Method not allowed" });
    }

    next();
  }

  public auth(req: Request, res: Response, next: NextFunction) {
    // const apiKeys = ["sdlfkjslfksdlfks", "sdkfjslkfjsljflk"];
    // // if apiKeys was not found -> return logger/res error

    // const ignoreToken = ["user/login", "user/logout"];
    // const endpoint = req.originalUrl;
    // const params = req.body;

    // const checkToken = !ignoreToken.some((ignoreTkn) =>
    //   endpoint.includes(ignoreTkn)
    // );

    // let portal_user_id = 0;
    // if (checkToken) {
    //   // if token was not valid -> return logger/res error

    //   // if token was valid -> add user_id to params
    //   // getJwtObj.data.user_id

    //   const userTokenObj = getJwtObj(params.token, config.mngSaltDev);
    //   if (!userTokenObj?.result) {
    //     // 'portal token error'

    //     return res.json({error_code:3002, result:false })
    //   } else {
    //     portal_user_id = userTokenObj.data?.user_id ?? 0;

    //     // params.venue_ids = userTokenObj.data?.venue_ids ?? ''
    //   }
    // }

    // params.portal_user_id = res.locals.params = params;
    next();
  }
}

export default new RequestMiddleware();
// jwt = require('jsonwebtoken'),
// const getJwtObj = (str,salt) => {

//   let rValue = {}
//   jwt.verify(str, salt, (err, data) => {
//       if (err) {
//           console.log('jwt error')
//           console.log(err.toString());

//           rValue.result = false

//       }
//       else {
//           rValue.result = true
//           rValue.data = data
//       }
//   })

//   return rValue
// }
