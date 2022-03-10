import { getError } from "./../../../../common/functions/errors";
import {
  IResGen,
  IResGenOptions,
  IErrGenOptions,
} from "@/common/interfaces/information";
import config from "config";
import { IApplicationConfig } from "@/../config/config.interface";

const applicationConfig: IApplicationConfig = config.get("application");
const mode: string = config.get("mode");

class Controller {
  public logger() {
    console.log("Log from Controller");
  }

  public resGen(options: IResGen) {
    const { res, status } = options;
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
    return {
      api_version: applicationConfig.api_version,
      front_version: applicationConfig.front_version,
      endpoint: req.originalUrl,
      env: process.env.NODE_ENV,
      mode,
      result,
      data,
    };
  }

  private static errorGenerator(options: IErrGenOptions) {
    const { req, result, error_code, error_user_messages } = options;
    const error = getError(error_code);
    return {
      api_version: applicationConfig.api_version,
      front_version: applicationConfig.front_version,
      endpoint: req.originalUrl,
      env: process.env.NODE_ENV,
      mode,
      result,
      error_code: error.code,
      error_message: error.message,
      error_user_messages,
    };
  }
}

export default Controller;
