import { getError } from "../../common/functions/errors";
import {
  IResGen,
  IResGenOptions,
  IErrGenOptions,
  ISuccessResponse,
  IErrorResponse,
  IRes,
} from "../../common/interfaces/general";
import config from "config";
import { IApplicationConfig } from "../../../config/config.interface";
import { LoggerEnum } from "../../common/enums/logger.enum";
import _ from "lodash";
import { Response } from "express";

const applicationConfig: IApplicationConfig = config.get("application");
const mode: string = config.get("mode");

class BaseController {
  public logger() {
    console.log("Log from BaseController");
  }

  public resGen<T>(options: IResGen<T>): Response<IRes<T>> {
    const { res, status } = options;
    logger(`{green}${JSON.stringify(_.omit(res.locals.params, ["process_id"]), null, 2)}{reset}`, LoggerEnum.REQUEST);
    return res
      .status(status || 200)
      .json(
        options.result
          ? BaseController.responseGenerator(options as IResGenOptions<T>)
          : BaseController.errorGenerator(options as IErrGenOptions)
      );
  }

  private static responseGenerator<T>(options: IResGenOptions<T>): ISuccessResponse<T> {
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

  private static errorGenerator(options: IErrGenOptions): IErrorResponse {
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
      error_code: error.code ?? 3000,
      error_message: error.message,
      error_user_messages,
    };
    logger(response, LoggerEnum.REQUEST);
    return response;
  }
}

export default BaseController;
