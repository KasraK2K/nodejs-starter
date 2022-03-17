import { IReadTable } from "../../common/interfaces/repository";
import { Pool, PoolClient } from "pg";
import { LoggerEnum } from "../../common/enums/logger.enum";
import _ from "lodash";

class Repository {
  protected async readTable(args: IReadTable, source: Pool = pg.pool_main): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const { fields, where, table, order, limit, group } = Repository.sanitizeArgs(args);
      const list: Record<string, any>[] = [];
      const query = `select ${fields} from ${table} ${where} ${order} ${group} ${limit}`;

      await this.executeQuery({ query, source })
        .then((qres) => {
          qres?.rows?.forEach((row: Record<string, any>) => {
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

  protected getUpsertQuery(data: Record<string, any>, schema: Record<string, any>): string {
    /*
    data : {
      id: 1,
      name: 'kasra',
      family_name: 'karami',
      address: {
        line1: "38 Raven"
        postcode: "sw62gn"
      }
    }

    schema = {
      table_name: `"Users"`,
      checking_data_field: 'user_id',
      table_id: 'id',
      returning: 'id',
      fields:{
        name (database field):{ field:'name' } (data field), 
        surname:{ field:'family_name'} ,
        address: {field:'address', is_json:true}
      }
    }
    */
    const checking_data_field = schema.checking_field || "id";
    const table_id = schema.table_id || "id";
    const table_name = schema.table_name || "";
    const fields: Record<string, any> = schema.fields || {};
    const keys: string[] = [];
    const values: string[] = [];
    const updates: string[] = [];
    let query = "";

    _.keys(fields).forEach((key) => {
      const fieldObject = fields[key]; // { field:'name' }
      let val = data[fieldObject.field] || "0";

      if (fieldObject.is_json) val = ` '${JSON.stringify(val)}' `;
      else if (fieldObject.is_array) val = ` '{${val}}' `;
      else val = ` '${val}' `;

      keys.push(` "${key}" `); // ['name', 'surname', 'address']
      values.push(val); // ['kasra','karami']
      updates.push(` "${key}" = '${val}' `); // [` name = 'kasra' `, ` surname = 'karami' `]
    });

    if (Number(data[checking_data_field]) === 0) {
      query = `INSERT INTO ${table_name} (${keys.join(" , ")}) VALUES (${values.join(" , ")})`;
      if (schema.returning) query += ` RETURNING ${schema.returning}`;
    } else {
      query = `UPDATE ${table_name} SET ${updates.join(",")} WHERE "${table_id}" = ${data[checking_data_field]}`;
    }
    return query;
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

  protected executeQuery(args: { query: string; source: Pool }): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const { source, query = "" } = args;

      await source
        .connect()
        .then((client: PoolClient) => {
          client
            .query(query)
            .then((qres) => {
              resolve(qres);
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
}

export default Repository;
