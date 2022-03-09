import { getError } from "./../../../../common/functions/errors";
import {
  IResGen,
  IResGenOptions,
  IErrGenOptions,
} from "@/common/interfaces/information";
import config from "config";
import { IApplicationConfig } from "../../../../../config/config.interface";

const applicationConfig: IApplicationConfig = config.get("application");
const mode: string = config.get("mode");

class Controller {
  public logger() {
    console.log("Log from Controller");
  }

  public resGen(options: IResGen) {
    return options.success
      ? Controller.responseGenerator(options as IResGenOptions)
      : Controller.errorGenerator(options as IErrGenOptions);
  }

  private static responseGenerator(options: IResGenOptions) {
    const { req, success, data } = options;
    return {
      api_version: applicationConfig.api_version,
      front_version: applicationConfig.front_version,
      endpoint: req.originalUrl,
      env: process.env.NODE_ENV,
      mode,
      success,
      data,
    };
  }

  private static errorGenerator(options: IErrGenOptions) {
    const { req, success, error, error_data } = options;
    return {
      api_version: applicationConfig.api_version,
      front_version: applicationConfig.front_version,
      endpoint: req.originalUrl,
      env: process.env.NODE_ENV,
      mode,
      success,
      error: getError(error),
      error_data,
    };
  }
}

export default Controller;
