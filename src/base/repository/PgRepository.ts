import { LoggerEnum } from "../../common/enums/logger.enum";
import _ from "lodash";
import { IReadTable } from "../../common/interfaces/repository";

class PgRepository {
  protected async readTable(args: IReadTable): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const query = this.getReadTableQuery(args);

      await this.executeQuery(query)
        .then((response) => resolve(response.rows))
        .catch((err) => {
          logger(`{red} error readTable {reset}`);
          logger(`{red}${err.stack}{reset}`, LoggerEnum.ERROR);
          reject(err);
        });
    });
  }

  protected getReadTableQuery(args: IReadTable): string {
    const { fields, where, table, order, limit, group } = PgRepository.sanitizeArgs(args);
    return `select ${fields} from ${table} ${where} ${order} ${group} ${limit}`;
  }

  protected async paginate(
    tableName: string,
    omits: string[] = [],
    pagination: { limit: number; page: number } = { limit: 200, page: 0 }
  ): Promise<Record<string, any>> {
    const { limit, page } = pagination;
    const query = this.getPaginateQuery(tableName, pagination);

    return new Promise(async (resolve, reject) => {
      let total_count: number;
      let total_page: number;
      await this.executeQuery(query, omits)
        .then((response) => {
          total_count = Number(response.rows[0].total_count);
          total_page = Math.ceil(total_count / limit);
          response.total_count = total_count;
          response.total_page = total_page;
          response.page = page;
          response.limit = limit;
          page !== total_page && (response.nextPage = page + 1);
          page - 1 && (response.prevPage = page - 1);
          response.rows = response.rows.map((row: any) => _.omit(row, ["total_count"]));
          resolve(response);
        })
        .catch((err) => reject(err));
    });
  }

  protected getPaginateQuery(tableName: string, pagination: { limit: number; page: number } = { limit: 200, page: 0 }) {
    const { limit, page } = pagination;
    let query = `SELECT *, count(*) OVER() AS total_count FROM ${tableName}`;
    if (limit) query += ` LIMIT ${limit}`;
    if (page) query += ` OFFSET ${(page - 1) * limit}`;

    return query;
  }

  protected async findAll(tableName: string, omits: string[] = []): Promise<Record<string, any>> {
    const query = ` SELECT * FROM ${tableName}`;

    return new Promise(async (resolve, reject) => {
      await this.executeQuery(query, omits)
        .then((response) => resolve(response))
        .catch((err) => {
          logger(`{red}${err.message}{reset}`, LoggerEnum.ERROR);
          logger(`{red}${err.stack}{reset}`, LoggerEnum.ERROR);
          return reject(err);
        });
    });
  }

  protected async totalCount(tableName: string): Promise<number> {
    const totalCountQuery = `SELECT COUNT(*) FROM ${tableName}`;
    return new Promise(async (resolve, reject) => {
      await this.executeQuery(totalCountQuery)
        .then((response) => resolve(Number(response.rows[0].count)))
        .catch((err) => {
          logger(`{red}${err.message}{reset}`, LoggerEnum.ERROR);
          logger(`{red}${err.stack}{reset}`, LoggerEnum.ERROR);
          return reject(err);
        });
    });
  }

  protected executeQuery(query: string, omits: string[] = []): Promise<Record<string, any>> {
    return new Promise(async (resolve, reject) => {
      await pg.pool
        .query(query)
        .then((response) => {
          const rows = response.rows.map((row) => _.omit(row, omits));
          return resolve({ rowCount: response.rowCount, rows });
        })
        .catch((err) => {
          switch (err.code) {
            case "23505": // unique key is already exist
              logger(`{red}${err.detail}{reset}`, LoggerEnum.ERROR);
              logger(`{red}${err.stack}{reset}`, LoggerEnum.ERROR);
              return reject({ result: false, error_code: 3008, errors: [err.detail] });

            case "42P01":
              logger(`{red}Database Table Not Found{reset}`, LoggerEnum.ERROR);
              logger(`{red}${err.stack}{reset}`, LoggerEnum.ERROR);
              return reject({ result: false, error_code: 3007 });

            case "ECONNREFUSED":
              logger(`{red}Database Connection Refused{reset}`, LoggerEnum.ERROR);
              logger(`{red}${err.stack}{reset}`, LoggerEnum.ERROR);
              return reject({ result: false, error_code: 3009 });

            default:
              logger(`{red}${err.message}{reset}`, LoggerEnum.ERROR);
              logger(`{red}${err.stack}{reset}`, LoggerEnum.ERROR);
              return reject(err);
          }
        });
    });
  }

  private static sanitizeArgs(args: IReadTable): IReadTable {
    args.table = args.table || "";
    args.fields = args.fields || "*";
    args.where = args.where && args.where.length ? ` where ${args.where} ` : "";
    args.order = args.order && args.order.length ? ` order by ${args.order} ` : "";
    args.limit = args.limit && Number(args.limit) ? ` limit ${args.limit} ` : "";
    args.group = args.group && args.group.length ? ` group by ${args.group} ` : "";
    return args;
  }
}

export default PgRepository;
