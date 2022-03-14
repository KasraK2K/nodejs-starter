export interface IReadTable {
  fields?: string;
  where?: string;
  table: string;
  order?: string;
  limit?: string;
  group?: string;
}
