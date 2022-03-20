import { IPagination } from "./../../modules/postgres/common/interface";
import { LoggerEnum } from "../../common/enums/logger.enum";
import _ from "lodash";
import { IReadTable } from "../../common/interfaces/repository";

class PgRepository {
  // ─── SELECT ALL ─────────────────────────────────────────────────────────────────
  protected async find(tableName: string, omits: string[] = []): Promise<Record<string, any>> {
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

  // ─── SELECT ONE ─────────────────────────────────────────────────────────────────

  // ─── CREATE ─────────────────────────────────────────────────────────────────────

  // ─── UPDATE ─────────────────────────────────────────────────────────────────────

  // ─── UPSERT ─────────────────────────────────────────────────────────────────────

  // ─── SAFE DELETE ────────────────────────────────────────────────────────────────

  // ─── DELETE ─────────────────────────────────────────────────────────────────────

  // ─── RESTORE ────────────────────────────────────────────────────────────────────

  // ─── PAGINATION ─────────────────────────────────────────────────────────────────
  protected async paginate(
    tableName: string,
    omits: string[] = [],
    pagination: IPagination = { limit: 200, page: 1, filter: {} }
  ): Promise<Record<string, any>> {
    const { limit, page } = pagination;
    const query = this.getPaginateQuery(tableName, pagination);

    return new Promise(async (resolve, reject) => {
      let total_count: number;
      let total_page: number;
      await this.executeQuery(query, omits)
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
          console.log(123123493987257, err);
          logger(`{red}${err.message}{reset}`, LoggerEnum.ERROR);
          logger(`{red}${err.stack}{reset}`, LoggerEnum.ERROR);
          return reject(err);
        });
    });
  }

  // ─── GET PAGINATION QUERY ───────────────────────────────────────────────────────
  protected getPaginateQuery(tableName: string, pagination: IPagination = { limit: 200, page: 1, filter: {} }) {
    const { limit, page } = pagination;
    let query = `SELECT *, count(*) OVER() AS total_count FROM "${tableName}" `;

    // ───────────────────────────────────────────────── AND WHERE ─────
    if (pagination.filter && pagination.filter.where) {
      const where = pagination.filter.where;
      query += `\n\tWHERE ${where
        .map((whereItem) => `${whereItem.field} ${whereItem.operator} '${whereItem.value}'`)
        .join(" AND ")} `;
    }

    // ────────────────────────────────────────────────── GROUP BY ─────
    if (pagination.filter && pagination.filter.group) {
      const group = pagination.filter.group;
      query += `\n\tGROUP BY ${group.map((groupItem) => `"${groupItem}"`).join(", ")}, "id" `;
    }

    // ───────────────────────────────────────────────── ORDER BY ─────
    if (pagination.filter && pagination.filter.order) {
      const order = pagination.filter.order;
      query += `\n\tORDER BY ${order.map((orderItem) => `"${orderItem}"`).join(", ")} `;
      pagination.filter && pagination.filter.is_asc ? (query += "ASC ") : (query += "DESC ");
    }

    // ────────────────────────────────────────── LIMIT AND OFFSET ─────
    if (limit) query += `\n\tLIMIT ${limit} `;
    if (page) query += `OFFSET ${(page - 1) * limit} `;
    query.trim() + ";";

    return query;
  }

  // ─── TOTAL COUNT ────────────────────────────────────────────────────────────────
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

  // ─── EXECUTE QUERY ──────────────────────────────────────────────────────────────
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
