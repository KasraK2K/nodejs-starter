import { Request, Response } from "express";

export interface IResGenOptions {
  req: Request;
  res: Response;
  status?: number;
  result: boolean;
  data: Record<string, any>;
}

export interface IErrGenOptions {
  req: Request;
  res: Response;
  status?: number;
  result: boolean;
  error_code: number;
  error_user_messages?: string[];
}

export type IResGen = IResGenOptions | IErrGenOptions;
