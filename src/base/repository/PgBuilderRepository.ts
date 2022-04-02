import { LoggerEnum } from "./../../common/enums/logger.enum";
import { IExecuteQueryOptions } from "../../common/interfaces/repository.interface";
import { ErrorHandlerTypeEnum } from "./../../common/enums/repository.enum";
import _ from "lodash";

class PgBuilderRepository {
  public readonly name = "PgBuilderRepository";
  private readonly replaceChar = "??";

  constructor(
    private query = "",
    private params: any[] = [],

    private selectQuery = "",
    private selectParams: any[] = [],

    private fromQuery = "",
    private fromParams: any[] = [],

    private whereQuery = "",
    private whereParams: any[] = [],

    private orderByQuery = "",
    private orderByParams: any[] = [],

    private groupByQuery = "",
    private groupByParams: any[] = [],

    private limitQuery = "",
    private limitParams: any[] = [],

    private offsetQuery = "",
    private offsetParams: any[] = [],

    private innerJoinQuery = "",
    private innerJoinParams: any[] = [],

    private leftJoinQuery = "",
    private leftJoinParams: any[] = [],

    private rightJoinQuery = "",
    private rightJoinParams: any[] = [],

    private leftOuterJoinQuery = "",
    private leftOuterJoinParams: any[] = [],

    private rightOuterJoinQuery = "",
    private rightOuterJoinParams: any[] = [],

    private fullOuterJoinQuery = "",
    private fullOuterJoinParams: any[] = [],

    private crossJoinQuery = "",
    private crossJoinParams: any[] = [],

    private unionQuery = "",
    private unionParams: any[] = [],

    private unionAllQuery = "",
    private unionAllParams: any[] = [],

    private intersectQuery = "",
    private intersectParams: any[] = [],

    private exceptQuery = "",
    private exceptParams: any[] = [],

    private havingQuery = "",
    private havingParams: any[] = [],

    private setQuery = "",
    private setParams: any[] = [],

    private valuesQuery = "",
    private valuesParams: any[] = [],

    private onConflictQuery = "",
    private onConflictParams: any[] = [],

    private returningQuery = "",
    private returningParams: any[] = []
  ) {
    this.reset();
  }

  /* -------------------------------------------------------------------------- */
  /*                               NORMAL SECTION                               */
  /* -------------------------------------------------------------------------- */

  // ─── SELECT ─────────────────────────────────────────────────────────────────────
  protected select(selectArg?: string | string[]): this {
    switch (typeof selectArg) {
      case "string":
        this.selectQuery = `SELECT ${this.replaceChar}`;
        this.selectParams.push(selectArg);
        break;

      case "object":
        this.selectQuery = `SELECT ${selectArg.map(() => `${this.replaceChar}`).join(", ")}`;
        this.selectParams = [...selectArg];
        break;

      default:
        this.selectQuery = `SELECT *`;
        break;
    }
    return this;
  }

  // ─── FROM ───────────────────────────────────────────────────────────────────────
  protected from(fromArg: string): this {
    this.fromQuery = `FROM ${this.replaceChar}`;
    this.fromParams.push(fromArg);
    return this;
  }

  // ─── WHERE ──────────────────────────────────────────────────────────────────────
  protected where(whereArgs: string | string[], params?: any[]): this {
    const whereArgsType = typeof whereArgs;
    const isArray = Array.isArray(whereArgs);

    switch (whereArgsType) {
      case "string":
        this.whereQuery = `WHERE ${whereArgs}`;
        if (params && params.length) this.whereParams = [...params];

        break;

      case "object":
        if (isArray) {
          this.whereQuery = `WHERE ${whereArgs.join(" AND ")}`;
          if (params && params.length) this.whereParams = [...params];
        } else {
          this.whereQuery = ``;
          PgBuilderRepository.errorHandler(
            `${this.name}: where argument is not a string or string[] and we are not handling it`,
            ErrorHandlerTypeEnum.WARNING
          );
        }
        break;

      default:
        this.whereQuery = ``;
        PgBuilderRepository.errorHandler(
          `${this.name}: where argument is not a string or string[] and we are not handling it`,
          ErrorHandlerTypeEnum.WARNING
        );
        break;
    }

    return this;
  }

  // ─── ORDER BY ───────────────────────────────────────────────────────────────────
  protected orderBy(orderArgs: string | string[], sort: string | string[]): this {
    const orderArgsType = typeof orderArgs;
    const isArgsArray = Array.isArray(orderArgs);
    const isSortArray = Array.isArray(sort);

    switch (orderArgsType) {
      case "string":
        this.orderByQuery = `\nORDER BY ${this.replaceChar} ${this.replaceChar}`;
        this.orderByParams = [orderArgs, sort];
        break;

      case "object":
        if (isSortArray && isArgsArray && orderArgs.length === sort.length) {
          this.orderByQuery = `\nORDER BY ${orderArgs.map(() => this.replaceChar).join(", ")} ${sort
            .map(() => this.replaceChar)
            .join(", ")}`;
          for (let i = 0; i < orderArgs.length; i++) {
            this.orderByParams.push(orderArgs[i]);
            this.orderByParams.push(sort[i]);
          }
        } else {
          this.orderByQuery = ``;
          PgBuilderRepository.errorHandler(
            `${this.name}: orderArgs and sort arguments are not the same type and length (in array mode)`,
            ErrorHandlerTypeEnum.ERROR
          );
        }
        break;

      default:
        this.orderByQuery = ``;
        PgBuilderRepository.errorHandler(
          `${this.name}: orderBy argument is not a string or string[] and we are not handling it`,
          ErrorHandlerTypeEnum.WARNING
        );
        break;
    }
    return this;
  }

  // ─── GROUP BY ───────────────────────────────────────────────────────────────────
  protected groupBy(groupByArg: string | string[]): this {
    switch (typeof groupByArg) {
      case "string":
        this.groupByQuery += `\nGROUP BY ${this.replaceChar}`;
        this.groupByParams.push(groupByArg);
        break;

      case "object":
        this.groupByQuery += `\nGROUP BY ${groupByArg.map(() => `${this.replaceChar}`).join(", ")}`;
        this.groupByParams = [...groupByArg];
        break;

      default:
        this.groupByQuery = ``;
        PgBuilderRepository.errorHandler(
          `${this.name}: groupBy argument is not a string or string[] and we are not handling it`,
          ErrorHandlerTypeEnum.WARNING
        );
        break;
    }
    return this;
  }

  // ─── LIMIT ──────────────────────────────────────────────────────────────────────
  protected limit(limitArg: number | string): this {
    this.limitQuery = `\nLIMIT ${this.replaceChar}`;
    this.limitParams.push(limitArg);
    return this;
  }

  // ─── OFFSET ─────────────────────────────────────────────────────────────────────
  protected offset(offsetArg: number | string): this {
    this.offsetQuery = `\nOFFSET ${this.replaceChar}`;
    this.offsetParams.push(offsetArg);
    return this;
  }

  /* -------------------------------------------------------------------------- */
  /*                                JOIN SECTION                                */
  /* -------------------------------------------------------------------------- */

  // ─── INNER JOIN ─────────────────────────────────────────────────────────────────
  protected innerJoin(innerJoinArg: string, on: string): this {
    this.innerJoinQuery += `\nINNER JOIN ${this.replaceChar} ON ${this.replaceChar}`;
    this.innerJoinParams = [...this.innerJoinParams, innerJoinArg, on];
    return this;
  }

  // ─── LEFT JOIN ──────────────────────────────────────────────────────────────────
  protected leftJoin(leftJoinArg: string, on: string): this {
    this.leftJoinQuery += `\nLEFT JOIN ${this.replaceChar} ON ${this.replaceChar}`;
    this.leftJoinParams = [...this.leftJoinParams, leftJoinArg, on];
    return this;
  }

  // ─── RIGHT JOIN ─────────────────────────────────────────────────────────────────
  protected rightJoin(rightJoinArg: string, on: string): this {
    this.rightJoinQuery += `\nRIGHT JOIN ${this.replaceChar} ON ${this.replaceChar}`;
    this.rightJoinParams = [...this.rightJoinParams, rightJoinArg, on];
    return this;
  }

  // ─── LEFT OUTER JOIN ────────────────────────────────────────────────────────────
  protected leftOuterJoin(leftOuterJoinArg: string, on: string): this {
    this.leftOuterJoinQuery += `\nLEFT OUTER JOIN ${this.replaceChar} ON ${this.replaceChar}`;
    this.leftOuterJoinParams = [...this.leftOuterJoinParams, leftOuterJoinArg, on];
    return this;
  }

  // ─── RIGHT OUTER JOIN ───────────────────────────────────────────────────────────
  protected rightOuterJoin(rightOuterJoinArg: string, on: string): this {
    this.rightOuterJoinQuery += `\nRIGHT OUTER JOIN ${this.replaceChar} ON ${this.replaceChar}`;
    this.rightOuterJoinParams = [...this.rightOuterJoinParams, rightOuterJoinArg, on];
    return this;
  }

  // ─── FULL JOIN ──────────────────────────────────────────────────────────────────
  protected fullOuterJoin(fullOuterJoinArg: string, on: string): this {
    this.fullOuterJoinQuery += `\nFULL OUTER JOIN ${this.replaceChar} ON ${this.replaceChar}`;
    this.fullOuterJoinParams = [...this.fullOuterJoinParams, fullOuterJoinArg, on];
    return this;
  }

  // ─── CROSS JOIN ─────────────────────────────────────────────────────────────────
  protected crossJoin(crossJoinArg: string): this {
    this.crossJoinQuery += `\nCROSS JOIN ${this.replaceChar}`;
    this.crossJoinParams.push(crossJoinArg);
    return this;
  }

  /* -------------------------------------------------------------------------- */
  /*                           QUERY FUNCTION SECTION                           */
  /* -------------------------------------------------------------------------- */

  // ──────────────────────────────────────────────────────────────────────────────────────────────────────────
  //   :::::: G E N E R A T E   Q U E S T I O N   M A R K   Q U E R Y : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────────────────────────────────────
  private generateAllQueryAndParams(): { query: string; params: any[] } {
    // ────────────────────────────── GENERATE QUESTION MARK QUERY ─────
    this.query = `
      ${this.selectQuery}
      ${this.fromQuery}
      ${this.whereQuery}`;

    if (this.innerJoinQuery) this.query += this.innerJoinQuery;
    if (this.leftJoinQuery) this.query += this.leftJoinQuery;
    if (this.rightJoinQuery) this.query += this.rightJoinQuery;
    if (this.leftOuterJoinQuery) this.query += this.leftOuterJoinQuery;
    if (this.rightOuterJoinQuery) this.query += this.rightOuterJoinQuery;
    if (this.fullOuterJoinQuery) this.query += this.fullOuterJoinQuery;
    if (this.crossJoinQuery) this.query += this.crossJoinQuery;

    if (this.groupByQuery) this.query += this.groupByQuery;
    if (this.orderByQuery) this.query += this.orderByQuery;
    if (this.limitQuery) this.query += this.limitQuery;
    if (this.offsetQuery) this.query += this.offsetQuery;

    // ─────────────────────────────────────────── GENERATE PARAMS ─────
    this.params = [...this.selectParams, ...this.fromParams, ...this.whereParams];

    if (this.innerJoinParams.length) this.params = [...this.params, ...this.innerJoinParams];
    if (this.leftJoinParams.length) this.params = [...this.params, ...this.leftJoinParams];
    if (this.rightJoinParams.length) this.params = [...this.params, ...this.rightJoinParams];
    if (this.leftOuterJoinParams.length) this.params = [...this.params, ...this.leftOuterJoinParams];
    if (this.rightOuterJoinParams.length) this.params = [...this.params, ...this.rightOuterJoinParams];
    if (this.fullOuterJoinParams.length) this.params = [...this.params, ...this.fullOuterJoinParams];
    if (this.crossJoinParams.length) this.params = [...this.params, ...this.crossJoinParams];

    if (this.groupByParams.length) this.params = [...this.params, ...this.groupByParams];
    if (this.orderByParams.length) this.params = [...this.params, ...this.orderByParams];
    if (this.limitParams.length) this.params = [...this.params, ...this.limitParams];
    if (this.offsetParams.length) this.params = [...this.params, ...this.offsetParams];

    return { query: this.query, params: this.params };
  }

  // ────────────────────────────────────────────────────────────────────────────────────────────
  //   :::::: G E N E R A T E   D O L L A R   Q U E R Y : :  :   :    :     :        :          :
  // ────────────────────────────────────────────────────────────────────────────────────────────
  private generateDollarQuery(): string {
    let index = 0;
    return this.query.replaceAll(this.replaceChar, () => `$${++index}`);
  }

  // ────────────────────────────────────────────────────────────────────
  //   :::::: G E T   Q U E R Y : :  :   :    :     :        :          :
  // ────────────────────────────────────────────────────────────────────
  protected getQuery(): { query: string; params: any[] } {
    this.generateAllQueryAndParams();
    const query = this.generateDollarQuery();
    const params = this.params;

    this.reset();

    return { query, params };
  }

  // ────────────────────────────────────────────────────────────────
  //   :::::: G E T   S Q L : :  :   :    :     :        :          :
  // ────────────────────────────────────────────────────────────────
  protected getSQL(): string {
    this.generateAllQueryAndParams();

    let index = 0;
    const query = this.query.replaceAll(this.replaceChar, () => this.params[index++]);

    this.reset();

    return query;
  }

  /* -------------------------------------------------------------------------- */
  /*                             AGGREGRATE SECTION                             */
  /* -------------------------------------------------------------------------- */

  // ──────────────────────────────────────────────────────────────────
  //   :::::: G E T   M A N Y : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────
  protected getMany(): Promise<Record<string, any>[]> {
    return new Promise(async (resolve, reject) => {
      const query = this.getSQL();
      await this.executeQuery({ query })
        .then((result) => resolve(result.rows))
        .catch((err) => reject(err));
    });
  }

  // ────────────────────────────────────────────────────────────────
  //   :::::: G E T   O N E : :  :   :    :     :        :          :
  // ────────────────────────────────────────────────────────────────
  protected getOne(): Promise<Record<string, any>> {
    return new Promise(async (resolve, reject) => {
      const query = this.getSQL();
      await this.executeQuery({ query })
        .then((result) => resolve(result.rows[0]))
        .catch((err) => reject(err));
    });
  }

  // ──────────────────────────────────────────────────────────────────────
  //   :::::: G E T   R E S U L T : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────
  protected getResult(): Promise<Record<string, any>> {
    return new Promise(async (resolve, reject) => {
      const query = this.getSQL();
      await pg.pool
        .query(query)
        .then((result) => resolve(result))
        .catch((err) => reject(this.databaseError(err)));
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
        .catch((err) => reject(this.databaseError(err)));
    });
  }

  /* -------------------------------------------------------------------------- */
  /*                                ERROR SECTION                               */
  /* -------------------------------------------------------------------------- */
  // ─────────────────────────────────────────────────── DATABASE ERROR HANDLER ─────
  private databaseError(err: Record<string, any>) {
    switch (err.code) {
      case "23505": // unique key is already exist
        logger(`{red}${err.detail}{reset}`, LoggerEnum.ERROR);
        logger(`{red}${err.stack}{reset}`, LoggerEnum.ERROR);
        return {
          result: false,
          error_code: 3008,
          errors: [err.detail],
        };

      case "42P01":
        logger(`{red}Database Table Not Found{reset}`, LoggerEnum.ERROR);
        logger(`{red}${err.stack}{reset}`, LoggerEnum.ERROR);
        return { result: false, error_code: 3007 };

      case "42703":
        logger(`{red}Database Column Not Found{reset}`, LoggerEnum.ERROR);
        logger(`{red}${err.stack}{reset}`, LoggerEnum.ERROR);
        return { result: false, error_code: 3010 };

      case "ECONNREFUSED":
        logger(`{red}Database Connection Refused{reset}`, LoggerEnum.ERROR);
        logger(`{red}${err.stack}{reset}`, LoggerEnum.ERROR);
        return { result: false, error_code: 3009 };

      default:
        logger(`{red}${err.message}{reset}`, LoggerEnum.ERROR);
        logger(`{red}${err.stack}{reset}`, LoggerEnum.ERROR);
        return err;
    }
  }

  // ───────────────────────────────────────────────────────────── ERROR LOGGER ─────
  private static errorHandler(errorMessage: any, errorType: ErrorHandlerTypeEnum): void {
    console[errorType](errorMessage);
  }

  /* -------------------------------------------------------------------------- */
  /*                                RESET SECTION                               */
  /* -------------------------------------------------------------------------- */
  private reset(): void {
    this.query = "";
    this.params = [];

    this.selectQuery = "";
    this.selectParams = [];

    this.fromQuery = "";
    this.fromParams = [];

    this.whereQuery = "";
    this.whereParams = [];

    this.orderByQuery = "";
    this.orderByParams = [];

    this.groupByQuery = "";
    this.groupByParams = [];

    this.limitQuery = "";
    this.limitParams = [];

    this.offsetQuery = "";
    this.offsetParams = [];

    this.innerJoinQuery = "";
    this.innerJoinParams = [];

    this.leftJoinQuery = "";
    this.leftJoinParams = [];

    this.rightJoinQuery = "";
    this.rightJoinParams = [];

    this.leftOuterJoinQuery = "";
    this.leftOuterJoinParams = [];

    this.rightOuterJoinQuery = "";
    this.rightOuterJoinParams = [];

    this.fullOuterJoinQuery = "";
    this.fullOuterJoinParams = [];

    this.crossJoinQuery = "";
    this.crossJoinParams = [];

    this.unionQuery = "";
    this.unionParams = [];

    this.unionAllQuery = "";
    this.unionAllParams = [];

    this.intersectQuery = "";
    this.intersectParams = [];

    this.exceptQuery = "";
    this.exceptParams = [];

    this.havingQuery = "";
    this.havingParams = [];

    this.setQuery = "";
    this.setParams = [];

    this.valuesQuery = "";
    this.valuesParams = [];

    this.onConflictQuery = "";
    this.onConflictParams = [];

    this.returningQuery = "";
    this.returningParams = [];
  }
}

export default PgBuilderRepository;
