import { Request, Response } from "express";

export interface IResGenOptions<T> {
  req: Request;
  res: Response;
  status?: number;
  result: boolean;
  data: T;
}

export interface IErrGenOptions {
  req: Request;
  res: Response;
  status: number;
  result: boolean;
  error_code: number;
  error_user_messages?: string[];
}

export type IResGen<T> = IResGenOptions<T> | IErrGenOptions;

export interface IResponse<T> {
  api_version: string;
  front_version: string;
  portal_vertion: string;
  endpoint: string;
  env: string | undefined;
  mode: string;
  result: boolean;
  data: T;
}

export interface IError {
  api_version: string;
  front_version: string;
  portal_vertion: string;
  endpoint: string;
  env: string | undefined;
  mode: string;
  result: boolean;
  error_code: number;
  error_message: string | undefined;
  error_user_message?: string[];
}

export type IRes<T> = IResponse<T> | IError;
