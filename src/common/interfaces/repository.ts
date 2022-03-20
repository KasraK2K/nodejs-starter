export interface IReadTable {
  table: string;
  fields?: string;
  where?: string;
  order?: string;
  limit?: string;
  group?: string;
}
