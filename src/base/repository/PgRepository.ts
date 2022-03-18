import { IReadTable } from "../../common/interfaces/repository";
import { Pool, PoolClient } from "pg";
import { LoggerEnum } from "../../common/enums/logger.enum";

class PgRepository {
  protected async readTable(args: IReadTable, source: Pool = pg.pool_main): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const { fields, where, table, order, limit, group } = PgRepository.sanitizeArgs(args);
      const list: Record<string, any>[] = [];
      const query = `select ${fields} from ${table} ${where} ${order} ${group} ${limit}`;

      await this.executeQuery({ query, source })
        .then((response) => {
          response?.rows?.forEach((row: Record<string, any>) => {
            list.push(row);
          });
          resolve(list);
        })
        .catch((err) => {
          logger(`{red} error readTable {reset}`);
          logger(`{red}${err.stack}{reset}`, LoggerEnum.ERROR);
          reject(err);
        });
    });
  }

  protected executeQuery(args: { query: string; source: Pool }): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const { source, query = "" } = args;

      await source
        .connect()
        .then((client: PoolClient) => {
          client
            .query(query)
            .then((response) => {
              resolve(response);
            })
            .catch((err) => {
              logger(`{red} error executeQuery {reset}`);
              logger(`{red} ${query} {reset}`);
              logger(`{red}${err.stack}{reset}`, LoggerEnum.ERROR);
              reject(err);
            })
            .finally(() => {
              client.release();
            });
        })
        .catch((err) => {
          logger(`{red} error executeQuery {reset}`);
          logger(`{red}${err.stack}{reset}`, LoggerEnum.ERROR);
          reject(err);
        });
    });
  }

  private static sanitizeArgs(args: IReadTable): IReadTable {
    args.fields = args.fields || "*";
    args.where = args.where && args.where.length ? ` where ${args.where} ` : "";
    args.table = args.table || "";
    args.order = args.order && args.order.length ? ` order by ${args.order} ` : "";
    args.limit = args.limit && Number(args.limit) ? ` limit ${args.limit} ` : "";
    args.group = args.group && args.group.length ? ` group by ${args.group} ` : "";
    return args;
  }
}

export default PgRepository;
