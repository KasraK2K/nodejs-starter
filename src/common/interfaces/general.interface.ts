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
  error_user_messages?: Record<string, any>[];
}

export type IResGen<T> = IResGenOptions<T> | IErrGenOptions;

// ────────────────────────────────────────────────────────────────────────────────

export interface ISuccessResponse<T> {
  api_version: string;
  front_version: string;
  portal_vertion: string;
  endpoint: string;
  env: string | undefined;
  mode: string;
  result: boolean;
  data: T[];
}

export interface IErrorResponse {
  api_version: string;
  front_version: string;
  portal_vertion: string;
  endpoint: string;
  env: string | undefined;
  mode: string;
  result: boolean;
  error_code: number;
  error_message: string | undefined;
  error_user_message?: Record<string, any>[];
}

export type IRes<T> = ISuccessResponse<T> | IErrorResponse;

// ────────────────────────────────────────────────────────────────────────────────
