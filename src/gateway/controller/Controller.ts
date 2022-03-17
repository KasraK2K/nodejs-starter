import { getError } from "../../common/functions/errors";
import { IResGen, IResGenOptions, IErrGenOptions } from "../../common/interfaces/information";
import config from "config";
import { IApplicationConfig } from "../../../config/config.interface";
import { LoggerEnum } from "../../common/enums/logger.enum";
import _ from "lodash";

const applicationConfig: IApplicationConfig = config.get("application");
const mode: string = config.get("mode");

class Controller {
  public logger() {
    console.log("Log from Controller");
  }

  public resGen(options: IResGen) {
    const { res, status } = options;
    logger(`{green}${JSON.stringify(_.omit(res.locals.params, ["process_id"]), null, 2)}{reset}`, LoggerEnum.REQUEST);
    return res
      .status(status || 200)
      .json(
        options.result
          ? Controller.responseGenerator(options as IResGenOptions)
          : Controller.errorGenerator(options as IErrGenOptions)
      );
  }

  private static responseGenerator(options: IResGenOptions) {
    const { req, result, data } = options;
    const response = {
      api_version: applicationConfig.api_version,
      front_version: applicationConfig.front_version,
      portal_vertion: applicationConfig.portal_version,
      endpoint: req.originalUrl,
      env: process.env.NODE_ENV,
      mode,
      result,
      data,
    };
    logger(response, LoggerEnum.REQUEST);
    return response;
  }

  private static errorGenerator(options: IErrGenOptions) {
    const { req, result, error_code, error_user_messages } = options;
    const error = getError(error_code);
    const response = {
      api_version: applicationConfig.api_version,
      front_version: applicationConfig.front_version,
      portal_vertion: applicationConfig.portal_version,
      endpoint: req.originalUrl,
      env: process.env.NODE_ENV,
      mode,
      result,
      error_code: error.code,
      error_message: error.message,
      error_user_messages,
    };
    logger(response, LoggerEnum.REQUEST);
    return response;
  }
}

export default Controller;
