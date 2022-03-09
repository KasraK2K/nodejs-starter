import {
  IResGen,
  IResGenOptions,
  IErrGenOptions,
} from "@/common/interfaces/information";
import config from "config";
import { IApplicationConfig } from "../../../../../config/config.interface";

const applicationConfig: IApplicationConfig = config.get("application");

class Controller {
  public logger() {
    console.log("Log from Controller");
  }

  protected resGen(options: IResGen) {
    return options.success
      ? Controller.responseGenerator(options as IResGenOptions)
      : Controller.errorGenerator(options as IErrGenOptions);
  }

  private static responseGenerator(options: IResGenOptions) {
    const { req, success, data } = options;
    return {
      api_version: applicationConfig.api_version,
      front_version: applicationConfig.front_version,
      endpoint: req.url,
      env: process.env.NODE_ENV,
      success,
      data,
    };
  }

  private static errorGenerator(options: IErrGenOptions) {
    const { req, success, error } = options;
    return {
      api_version: applicationConfig.api_version,
      front_version: applicationConfig.front_version,
      endpoint: req.url,
      env: process.env.NODE_ENV,
      success,
      error,
    };
  }
}

export default Controller;
