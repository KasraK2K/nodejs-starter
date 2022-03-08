import { Request } from "express";

export interface IResGenOptions {
  req: Request;
  success: boolean;
  data: Record<string, any>;
}

export interface IErrGenOptions {
  req: Request;
  success: boolean;
  error: string;
}

export type IResGen = IResGenOptions | IErrGenOptions;
