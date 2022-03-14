import { IReadTable } from "../../common/interfaces/repository";
import { Pool, PoolClient } from "pg";

class Repository {
  readTable(args: IReadTable, source: Pool = pg.pool_main): Promise<any> {
    const { fields, where, table, order, limit, group } = Repository.sanitizeArgs(args);
    return new Promise(async function (resolve, reject) {
      let list: Record<string, any>[] = [];
      let query = `select ${fields} from ${table} ${where} ${order} ${group} ${limit}`;
      await Repository.executeQuery({ query, source })
        .then((qres: any) => {
          qres?.qres?.rows?.forEach((row: Record<string, any>) => list.push(row));
          resolve(list);
        })
        .catch((err) => reject({ error_message: "error reading table" }));
    });
  }

  private static sanitizeArgs(args: IReadTable) {
    args.fields = args.fields || "*";
    args.where = args.where && args.where.length ? ` where ${args.where} ` : "";
    args.table = args.table || "";
    args.order = args.order && args.order.length ? ` order by ${args.order} ` : "";
    args.limit = args.limit && Number(args.limit) ? ` limit ${args.limit} ` : "";
    args.group = args.group && args.group.length ? ` group by ${args.group} ` : "";
    return args;
  }

  private static executeQuery(args: { query: string; source: Pool }) {
    const { source, query = "" } = args;
    return new Promise(async (resolve, reject) => {
      source
        .connect()
        .then((client: PoolClient) => {
          client
            .query(query)
            .then((qres) => resolve(qres))
            .catch((err) => reject(err))
            .finally(() => client.release());
        })
        .catch((err) => reject(err));
    });
  }
}

export default Repository;
