import { Request } from "express";

export interface IResGenOptions {
  req: Request;
  success: boolean;
  data: Record<string, any>;
}

export interface IErrGenOptions {
  req: Request;
  success: boolean;
  error: number;
}

export type IResGen = IResGenOptions | IErrGenOptions;
