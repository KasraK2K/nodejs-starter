import {
  IResGen,
  IResGenOptions,
  IErrGenOptions,
} from "@/common/interfaces/information";

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
      api_version: process.env.API_VERSION,
      front_version: process.env.FRONT_VERSION,
      endpoint: req.url,
      env: process.env.NODE_ENV,
      success,
      data,
    };
  }

  private static errorGenerator(options: IErrGenOptions) {
    const { req, success, error } = options;
    return {
      api_version: process.env.API_VERSION,
      front_version: process.env.FRONT_VERSION,
      endpoint: req.url,
      env: process.env.NODE_ENV,
      success,
      error,
    };
  }
}

export default Controller;
