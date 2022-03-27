class PgBuilderRepository {
  public readonly name = "PgBuilderRepository";
  private parameters: string[] = [];
  private replaceChar = "??";
  private parameterIndex = 0;

  constructor(
    private query: string = "",

    private selectQuery: string = "",
    private fromQuery: string = "",
    private whereQuery: string = "",
    private orderByQuery: string = "",
    private groupByQuery: string = "",
    private limitQuery: string = "",
    private offsetQuery: string = "",
    private innerJoinQuery: string = "",
    private leftJoinQuery: string = "",
    private rightJoinQuery: string = "",
    private leftOuterJoinQuery: string = "",
    private rightOuterJoinQuery: string = "",
    private fullJoinQuery: string = "",
    private crossJoinQuery: string = "",
    private naturalJoinQuery: string = "" /*
    private unionQuery: string = "",
    private unionAllQuery: string = "",
    private exceptQuery: string = "",
    private intersectQuery: string = ""
    */
  ) {}

  /* -------------------------------------------------------------------------- */
  /*                               NORMAL SECTION                               */
  /* -------------------------------------------------------------------------- */

  // ─── SELECT ─────────────────────────────────────────────────────────────────────
  protected select(selectArg: string | string[] = "*"): this {
    this.selectQuery += `SELECT `;

    switch (typeof selectArg) {
      case "string":
        this.selectQuery += `SELECT ${this.replaceChar}`;
        this.parameters.push(selectArg);
        this.parameterIndex++;
        break;

      case "object":
        this.selectQuery += `SELECT ${selectArg.map(() => `${this.replaceChar}`).join(", ")}`;
        this.parameters = [...this.parameters, ...selectArg];
        this.parameterIndex += selectArg.length;
        break;

      default:
        this.selectQuery = `SELECT *`;
        console.log(`${this.name}: select argument is not a string or string[] and we are not handling it`);
        break;
    }
    return this;
  } // ANCHOR TESTED

  // ─── FROM ───────────────────────────────────────────────────────────────────────
  protected from(fromArg: string): this {
    this.fromQuery += `FROM ${this.replaceChar}`;
    this.parameters.push(fromArg);
    this.parameterIndex++;
    return this;
  }

  // ─── WHERE ──────────────────────────────────────────────────────────────────────
  protected where(whereArg: string | string[]): this {
    this.whereQuery += `WHERE `;

    switch (typeof whereArg) {
      case "string":
        this.whereQuery += `${this.replaceChar}`;
        this.parameters.push(whereArg);
        this.parameterIndex++;
        break;

      case "object":
        this.whereQuery += `${whereArg.map(() => `${this.replaceChar}`).join(" AND ")}`;
        this.parameters = [...this.parameters, ...whereArg];
        this.parameterIndex += whereArg.length;
        break;

      default:
        this.whereQuery = ``;
        console.log(`${this.name}: where argument is not a string or string[] and we are not handling it`);
        break;
    }
    return this;
  }

  // ─── ORDER BY ───────────────────────────────────────────────────────────────────
  protected orderBy(orderByArg: string | string[], sort: "ASC" | "DESC" = "ASC"): this {
    this.orderByQuery += `ORDER BY `;

    switch (typeof orderByArg) {
      case "string":
        this.orderByQuery += `${this.replaceChar} ${sort}`;
        this.parameters.push(orderByArg);
        this.parameterIndex++;
        break;

      case "object":
        this.orderByQuery += `${orderByArg.map(() => `${this.replaceChar}`).join(", ")} ${sort}`;
        this.parameters = [...this.parameters, ...orderByArg];
        this.parameterIndex += orderByArg.length;
        break;

      default:
        this.orderByQuery = ``;
        console.log(`${this.name}: orderBy argument is not a string or string[] and we are not handling it`);
        break;
    }
    return this;
  }

  // ─── GROUP BY ───────────────────────────────────────────────────────────────────
  protected groupBy(groupByArg: string | string[]): this {
    this.groupByQuery += `GROUP BY `;

    switch (typeof groupByArg) {
      case "string":
        this.groupByQuery += `${this.replaceChar}`;
        this.parameters.push(groupByArg);
        this.parameterIndex++;
        break;

      case "object":
        this.groupByQuery += `${groupByArg.map(() => `${this.replaceChar}`).join(", ")}`;
        this.parameters = [...this.parameters, ...groupByArg];
        this.parameterIndex += groupByArg.length;
        break;

      default:
        this.groupByQuery = ``;
        console.log(`${this.name}: groupBy argument is not a string or string[] and we are not handling it`);
        break;
    }
    return this;
  }

  // ─── LIMIT ──────────────────────────────────────────────────────────────────────
  protected limit(limitArg: number | string): this {
    this.limitQuery += `LIMIT ${this.replaceChar}`;
    this.parameters.push(String(limitArg));
    this.parameterIndex++;
    return this;
  }

  // ─── OFFSET ─────────────────────────────────────────────────────────────────────
  protected offset(offsetArg: number | string): this {
    this.offsetQuery += `OFFSET ${this.replaceChar}`;
    this.parameters.push(String(offsetArg));
    this.parameterIndex++;
    return this;
  }

  /* -------------------------------------------------------------------------- */
  /*                                JOIN SECTION                                */
  /* -------------------------------------------------------------------------- */

  // ─── INNER JOIN ─────────────────────────────────────────────────────────────────
  protected innerJoin(innerJoinArg: string, on: string): this {
    this.innerJoinQuery += `INNER JOIN ${this.replaceChar} ON ${this.replaceChar}`;
    this.parameters.push(innerJoinArg, on);
    this.parameterIndex += 2;
    return this;
  }

  // ─── LEFT JOIN ─────────────────────────────────────────────────────────────────
  protected leftJoin(leftJoinArg: string, on: string): this {
    this.leftJoinQuery += `LEFT JOIN ${this.replaceChar} ON ${this.replaceChar}`;
    this.parameters.push(leftJoinArg, on);
    this.parameterIndex += 2;
    return this;
  }

  // ─── RIGHT JOIN ────────────────────────────────────────────────────────────────
  protected rightJoin(rightJoinArg: string, on: string): this {
    this.rightJoinQuery += `RIGHT JOIN ${this.replaceChar} ON ${this.replaceChar}`;
    this.parameters.push(rightJoinArg, on);
    this.parameterIndex += 2;
    return this;
  }

  // ─── LEFT OUTER JOIN ────────────────────────────────────────────────────────────
  protected leftOuterJoin(leftOuterJoinArg: string, on: string): this {
    this.leftOuterJoinQuery += `LEFT OUTER JOIN ${this.replaceChar} ON ${this.replaceChar}`;
    this.parameters.push(leftOuterJoinArg, on);
    this.parameterIndex += 2;
    return this;
  }

  // ─── RIGHT OUTER JOIN ───────────────────────────────────────────────────────────
  protected rightOuterJoin(rightOuterJoinArg: string, on: string): this {
    this.rightOuterJoinQuery += `RIGHT OUTER JOIN ${this.replaceChar} ON ${this.replaceChar}`;
    this.parameters.push(rightOuterJoinArg, on);
    this.parameterIndex += 2;
    return this;
  }

  // ─── FULL JOIN ─────────────────────────────────────────────────────────────────
  protected fullJoin(fullJoinArg: string, on: string): this {
    this.fullJoinQuery += `FULL OUTER JOIN ${this.replaceChar} ON ${this.replaceChar}`;
    this.parameters.push(fullJoinArg, on);
    this.parameterIndex += 2;
    return this;
  }

  // ─── CROSS JOIN ─────────────────────────────────────────────────────────────────
  protected crossJoin(crossJoinArg: string): this {
    this.crossJoinQuery += `CROSS JOIN ${this.replaceChar}`;
    this.parameters.push(crossJoinArg);
    this.parameterIndex++;
    return this;
  }

  // ─── NATURAL JOIN ──────────────────────────────────────────────────────────────
  protected naturalJoin(naturalJoinArg: string): this {
    this.naturalJoinQuery += `NATURAL JOIN ${this.replaceChar}`;
    this.parameters.push(naturalJoinArg);
    this.parameterIndex++;
    return this;
  }

  /* -------------------------------------------------------------------------- */
  /*                           QUERY FUNCTION SECTION                           */
  /* -------------------------------------------------------------------------- */

  // ──────────────────────────────────────────────────────────────────────────────────────────────────────────
  //   :::::: G E N E R A T E   Q U E S T I O N   M A R K   Q U E R Y : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────────────────────────────────────────
  private generateQuestionMarkQuery(): string {
    this.query = `${this.selectQuery} ${this.fromQuery} ${this.whereQuery}`;

    if (this.innerJoinQuery) this.query += this.innerJoinQuery;
    if (this.leftJoinQuery) this.query += this.leftJoinQuery;
    if (this.rightJoinQuery) this.query += this.rightJoinQuery;
    if (this.leftOuterJoinQuery) this.query += this.leftOuterJoinQuery;
    if (this.rightOuterJoinQuery) this.query += this.rightOuterJoinQuery;
    if (this.fullJoinQuery) this.query += this.fullJoinQuery;
    if (this.crossJoinQuery) this.query += this.crossJoinQuery;
    if (this.naturalJoinQuery) this.query += this.naturalJoinQuery;

    this.query += ` ${this.groupByQuery} ${this.orderByQuery} ${this.limitQuery} ${this.offsetQuery}`;

    return this.query;
  }

  // ────────────────────────────────────────────────────────────────────────────────────────────
  //   :::::: G E N E R A T E   D O L L A R   Q U E R Y : :  :   :    :     :        :          :
  // ────────────────────────────────────────────────────────────────────────────────────────────
  private generateDollarQuery(): void {
    let index = 0;
    this.query = this.query.replace(this.replaceChar, () => `$${++index}`);
    if (index !== this.parameterIndex || index !== this.parameters.length)
      console.log(`${this.name}: parameterIndex and parameters.length and index are not equal`);
  }

  // ────────────────────────────────────────────────────────────────────
  //   :::::: G E T   Q U E R Y : :  :   :    :     :        :          :
  // ────────────────────────────────────────────────────────────────────
  protected getQuery(): string {
    this.generateQuestionMarkQuery();
    this.generateDollarQuery();
    return this.query;
  }

  // ────────────────────────────────────────────────────────────────
  //   :::::: G E T   S Q L : :  :   :    :     :        :          :
  // ────────────────────────────────────────────────────────────────
  protected getSQL(): string {
    this.generateQuestionMarkQuery();

    let index = 0;
    this.query = this.query.replace(this.replaceChar, () => this.parameters[index++]);
    if (index !== this.parameterIndex || index !== this.parameters.length)
      console.log(`${this.name}: parameterIndex and parameters.length and index are not equal`);
    return this.query;
  }

  /* -------------------------------------------------------------------------- */
  /*                             AGGREGRATE SECTION                             */
  /* -------------------------------------------------------------------------- */

  // ──────────────────────────────────────────────────────────────────
  //   :::::: G E T   M A N Y : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────
  protected getMany(): Promise<Record<string, any>[]> {
    return new Promise(async (resolve, reject) => {
      const query = this.getQuery();
      await pg.pool
        .query(query, this.parameters)
        .then((result) => resolve(result.rows))
        .catch((err) => reject(err));
    });
  }

  // ────────────────────────────────────────────────────────────────
  //   :::::: G E T   O N E : :  :   :    :     :        :          :
  // ────────────────────────────────────────────────────────────────
  protected getOne(): Promise<Record<string, any>> {
    return new Promise(async (resolve, reject) => {
      const query = this.getQuery();
      await pg.pool
        .query(query, this.parameters)
        .then((result) => resolve(result.rows[0]))
        .catch((err) => reject(err));
    });
  }

  // ──────────────────────────────────────────────────────────────────────
  //   :::::: G E T   R E S U L T : :  :   :    :     :        :          :
  // ──────────────────────────────────────────────────────────────────────
  protected getResult(): Promise<Record<string, any>> {
    return new Promise(async (resolve, reject) => {
      const query = this.getQuery();
      await pg.pool
        .query(query, this.parameters)
        .then((result) => resolve(result))
        .catch((err) => reject(err));
    });
  }
}

export default PgBuilderRepository;
