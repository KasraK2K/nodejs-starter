export interface IReadTable {
  table: string;
  fields?: string;
  where?: string;
  order?: string;
  limit?: string;
  group?: string;
}

export interface IExecuteQueryOptions {
  query: string;
  parameters?: any[];
  omits?: string[];
}

export interface IQueryGenerator {
  query: string;
  parameters: any[];
}
