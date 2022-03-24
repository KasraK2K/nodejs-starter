import { IFilter, IPagination } from "./../../modules/postgres/common/interface";
import { LoggerEnum } from "../../common/enums/logger.enum";
import _ from "lodash";
import { IExecuteQueryOptions, IQueryGenerator, IReadTable } from "../../common/interfaces/repository";
import { resolve } from "path";

class PgRepository {
  // ─── SELECT ALL ─────────────────────────────────────────────────────────────────
  protected find(tableName: string, omits: string[] = []): Promise<Record<string, any>> {
    const query = ` SELECT * FROM ${tableName}`;

    return new Promise(async (resolve, reject) => {
      await this.executeQuery({ query, omits })
        .then((response) => resolve(response))
        .catch((err) => {
          logger(`{red}${err.message}{reset}`, LoggerEnum.ERROR);
          logger(`{red}${err.stack}{reset}`, LoggerEnum.ERROR);
          return reject(err);
        });
    });
  }

  // ─── SELECT ONE ─────────────────────────────────────────────────────────────────
  protected findOne(tableName: string, args: Record<string, any>, omits: string[] = []): Promise<Record<string, any>> {
    const { query, parameters } = this.getfindOneQuery(tableName, args);

    return new Promise(async (resolve, reject) => {
      await this.executeQuery({ query, parameters, omits })
        .then((response) => resolve(response))
        .catch((err) => {
          logger(`{red}${err.message}{reset}`, LoggerEnum.ERROR);
          logger(`{red}${err.stack}{reset}`, LoggerEnum.ERROR);
          return reject(err);
        });
    });
  }

  // ─── SELECT ONE ─────────────────────────────────────────────────────────────────
  protected getfindOneQuery(tableName: string, args: Record<string, any>): IQueryGenerator {
    let index = 0;
    const parameters = _.values(args);
    const query = `
      SELECT * FROM ${tableName}
      \tWHERE ${_.keys(args)
        .map((arg) => `\n\t${arg} = $${++index}`)
        .join(" AND ")}
      \tLIMIT 1
    `;
    return { query, parameters };
  }

  // ─── INSERT ─────────────────────────────────────────────────────────────────────
  protected insert(tableName: string, args: Record<string, any>, omits: string[] = []): Promise<Record<string, any>> {
    args = _.omit(args, ["api_key"]);
    const { query, parameters } = this.getInsertQuery(tableName, args);

    return new Promise(async (resolve, reject) => {
      // TODO: FIX parameters
      await this.executeQuery({ query, parameters, omits })
        .then((response) => resolve(response))
        .catch((err) => {
          logger(`{red}${err.message}{reset}`, LoggerEnum.ERROR);
          logger(`{red}${err.stack}{reset}`, LoggerEnum.ERROR);
          return reject(err);
        });
    });
  }

  // ─── GET INSERT QUERY ───────────────────────────────────────────────────────────
  protected getInsertQuery(tableName: string, args: Record<string, any>): IQueryGenerator {
    let index = 0;
    const parameters = _.values(args);
    const keys = _.keys(args);
    const query = `
      INSERT INTO ${tableName}
      \t(${keys})
      \tVALUES (${keys.map(() => `$${++index}`).join(", ")})
      \tRETURNING *;
    `;
    return { query, parameters };
  }

  // ─── UPDATE ─────────────────────────────────────────────────────────────────────
  protected update(tableName: string, args: Record<string, any>, omits: string[] = []): Promise<Record<string, any>> {
    const { query, parameters } = this.getUpdateQuery(tableName, args, omits);

    return new Promise(async (resolve, reject) => {
      await this.executeQuery({ query, parameters })
        .then((response) => resolve(response))
        .catch((err) => {
          logger(`{red}${err.message}{reset}`, LoggerEnum.ERROR);
          logger(`{red}${err.stack}{reset}`, LoggerEnum.ERROR);
          return reject(err);
        });
    });
  }

  // ─── GET UPDATE QUERY ───────────────────────────────────────────────────────────
  protected getUpdateQuery(tableName: string, args: Record<string, any>, omits: string[] = []): IQueryGenerator {
    let index = 0;
    const id = args.id;
    delete args.id;

    const parameters = _.values(args);
    parameters.push(id);
    const query = `
      UPDATE ${tableName} SET
      \t${_.keys(args).map((arg) => `\n\t${arg} = $${++index}`)}
      \tWHERE id = $${++index}
      \tRETURNING ${_.keys(_.omit(args, omits)).join(", ")}
    `;

    return { query, parameters };
  }

  // SECTION: Write more
  // ─── UPSERT ─────────────────────────────────────────────────────────────────────

  // ─── GET UPSERT QUERY ───────────────────────────────────────────────────────────

  // ─── SAFE DELETE ────────────────────────────────────────────────────────────────
  protected safeDeleteOne(tableName: string, id: string, omits: string[] = []): Promise<Record<string, any>> {
    const { query, parameters } = this.getSafeDeleteOneQuery(tableName, id);

    return new Promise(async (resolve, reject) => {
      await this.executeQuery({ query, parameters, omits })
        .then((response) => resolve(response))
        .catch((err) => {
          logger(`{red}${err.message}{reset}`, LoggerEnum.ERROR);
          logger(`{red}${err.stack}{reset}`, LoggerEnum.ERROR);
          return reject(err);
        });
    });
  }

  // ─── GET SAFE DELETE ONE QUERY ──────────────────────────────────────────────────
  protected getSafeDeleteOneQuery(tableName: string, id: string): IQueryGenerator {
    const parameters = [id];
    const query = `UPDATE ${tableName} SET deleted_at = NOW() WHERE id = $1 LIMIT 1`;
    return { query, parameters };
  }

  // ─── RESTORE ONE ────────────────────────────────────────────────────────────────
  protected restoreOne(tableName: string, id: string): Promise<Record<string, any>> {
    const { query, parameters } = this.getRestoreOneQuery(tableName, id);
    return new Promise(async (resolve, reject) => {
      await this.executeQuery({ query, parameters })
        .then((response) => resolve(response))
        .catch((err) => {
          logger(`{red}${err.message}{reset}`, LoggerEnum.ERROR);
          logger(`{red}${err.stack}{reset}`, LoggerEnum.ERROR);
          return reject(err);
        });
    });
  }

  // ─── GET RESTORE ONE QUERY ──────────────────────────────────────────────────────
  protected getRestoreOneQuery(tableName: string, id: string): IQueryGenerator {
    const parameters = [id];
    const query = `UPDATE ${tableName} SET deleted_at = NULL WHERE id = $1 LIMIT 1`;
    return { query, parameters };
  }

  // ─── DELETE ONE ─────────────────────────────────────────────────────────────────
  protected deleteOne(tableName: string, id: string): Promise<Record<string, any>> {
    const { query, parameters } = this.getDeleteOneQuery(tableName, id);
    return new Promise(async (resolve, reject) => {
      await this.executeQuery({ query, parameters })
        .then((response) => resolve(response))
        .catch((err) => {
          logger(`{red}${err.message}{reset}`, LoggerEnum.ERROR);
          logger(`{red}${err.stack}{reset}`, LoggerEnum.ERROR);
          return reject(err);
        });
    });
  }

  // ─── GET DELETE ONE QUERY ───────────────────────────────────────────────────────
  protected getDeleteOneQuery(tableName: string, id: string): IQueryGenerator {
    const parameters = [id];
    const query = `DELETE FROM ${tableName} WHERE id = $1 LIMIT 1`;
    return { query, parameters };
  }

  // ─── PAGINATION ─────────────────────────────────────────────────────────────────
  protected paginate(
    tableName: string,
    pagination: IPagination = { limit: 200, page: 1, filter: {} },
    omits: string[] = []
  ): Promise<Record<string, any>> {
    const { limit, page } = pagination;
    const { query, parameters } = this.getPaginateQuery(tableName, pagination);

    return new Promise(async (resolve, reject) => {
      let total_count: number;
      let total_page: number;
      await this.executeQuery({ query, parameters, omits })
        .then((response) => {
          if (response.rowCount) {
            total_count = Number(response.rows[0].total_count);
            total_page = Math.ceil(total_count / limit);
            response.total_count = total_count;
            response.total_page = total_page;
            response.page = page;
            response.limit = limit;
            page !== total_page && (response.nextPage = page + 1);
            page - 1 && (response.prevPage = page - 1);
            response.rows = response.rows.map((row: any) => _.omit(row, ["total_count"]));
            return resolve(response);
          } else {
            return resolve([]);
          }
        })
        .catch((err) => {
          logger(`{red}${err.message}{reset}`, LoggerEnum.ERROR);
          logger(`{red}${err.stack}{reset}`, LoggerEnum.ERROR);
          return reject(err);
        });
    });
  }

  // ─── GET PAGINATION QUERY ───────────────────────────────────────────────────────
  protected getPaginateQuery(
    tableName: string,
    pagination: IPagination = { limit: 200, page: 1, filter: {} }
  ): IQueryGenerator {
    const { limit, page } = pagination;
    const query = `SELECT *, count(*) OVER() AS total_count FROM ${tableName} `;
    const filter: IFilter = _.assign({ ...pagination.filter, limit, page });
    return this.addFiltertoQuery(filter, query);
  }

  // ─── ADD FILTER TO QUERY ────────────────────────────────────────────────────────
  protected addFiltertoQuery(filter: IFilter, query: string, index = 0): IQueryGenerator {
    const parameters: string[] = [];

    // ───────────────────────────────────────────────── AND WHERE ─────
    if (filter && filter.where) {
      const where = filter.where;
      where.map((objItem) => parameters.push(objItem.value));
      query += `\n\tWHERE ${where
        .map((objItem) => `${objItem.field} ${objItem.operator} $${++index}`)
        .join("\n\tAND ")} `;
    }

    // ────────────────────────────────────────────────── GROUP BY ─────
    if (filter && filter.group) {
      const group = filter.group;
      group.forEach((item) => parameters.push(item));
      query += `\n\tGROUP BY ${group.map(() => `$${++index}`).join(", ")}, "id" `;
    }

    // ───────────────────────────────────────────────── ORDER BY ─────
    if (filter && filter.order) {
      const order = filter.order;
      order.forEach((item) => parameters.push(item));
      query += `\n\tORDER BY ${order.map(() => `$${++index}`).join(", ")} `;
      filter && filter.is_asc ? (query += "ASC ") : (query += "DESC ");
    }

    // ────────────────────────────────────────── LIMIT AND OFFSET ─────
    if (filter.limit && filter.page) {
      if (filter.limit) query += `\n\tLIMIT ${filter.limit} `;
      if (filter.page) query += `OFFSET ${(filter.page - 1) * filter.limit} `;
    }
    query.trim();

    return { query, parameters };
  }

  // ─── TOTAL COUNT ────────────────────────────────────────────────────────────────
  protected totalCount(tableName: string): Promise<number> {
    const query = `SELECT COUNT(*) FROM ${tableName}`;
    return new Promise(async (resolve, reject) => {
      await this.executeQuery({ query })
        .then((response) => resolve(Number(response.rows[0].count)))
        .catch((err) => {
          logger(`{red}${err.message}{reset}`, LoggerEnum.ERROR);
          logger(`{red}${err.stack}{reset}`, LoggerEnum.ERROR);
          return reject(err);
        });
    });
  }

  // ─── EXECUTE QUERY ──────────────────────────────────────────────────────────────
  protected executeQuery(options: IExecuteQueryOptions): Promise<Record<string, any>> {
    const { query, parameters = [], omits = [] } = options;

    return new Promise(async (resolve, reject) => {
      await pg.pool
        .query(query, parameters)
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

            case "42703":
              logger(`{red}Database Column Not Found{reset}`, LoggerEnum.ERROR);
              logger(`{red}${err.stack}{reset}`, LoggerEnum.ERROR);
              return reject({ result: false, error_code: 3010 });

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

  // ─── READ TABLE ─────────────────────────────────────────────────────────────────
  protected readTable(args: IReadTable): Promise<Record<string, any>> {
    return new Promise(async (resolve, reject) => {
      const query = this.getReadTableQuery(args);

      await this.executeQuery({ query, parameters: [] })
        .then((response) => resolve(response.rows))
        .catch((err) => {
          logger(`{red} error readTable {reset}`);
          logger(`{red}${err.stack}{reset}`, LoggerEnum.ERROR);
          reject(err);
        });
    });
  }

  // ─── GET READ TABLE QUERY ───────────────────────────────────────────────────────
  protected getReadTableQuery(args: IReadTable): string {
    const { fields, where, table, order, limit, group } = PgRepository.sanitizeArgs(args);
    return `select ${fields} from ${table} ${where} ${order} ${group} ${limit}`;
  }

  // ─── SANITIZE ARGUMENTS ─────────────────────────────────────────────────────────
  private static sanitizeArgs(args: IReadTable): IReadTable {
    args.table = args.table || "";
    args.fields = args.fields || "*";
    args.where = args.where && args.where.length ? ` WHERE ${args.where} ` : "";
    args.order = args.order && args.order.length ? ` ORDER BY ${args.order} ` : "";
    args.limit = args.limit && Number(args.limit) ? ` LIMIT ${args.limit} ` : "";
    args.group = args.group && args.group.length ? ` GROUP BY ${args.group} ` : "";
    return args;
  }
}

export default PgRepository;
