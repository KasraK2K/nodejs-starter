import { Request } from "express";

export interface IResGenOptions {
  req: Request;
  result: boolean;
  data: Record<string, any>;
}

export interface IErrGenOptions {
  req: Request;
  result: boolean;
  error_code: number;
  error_user_messages?: string[];
}

export type IResGen = IResGenOptions | IErrGenOptions;
