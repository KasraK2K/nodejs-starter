export type ILogicResult = ILogicSuccess | ILogicError;

export interface ILogicSuccess {
  result: boolean;
  data: Record<string, any>[];
}

export interface ILogicError {
  result: boolean;
  err: Record<string, any>;
}
