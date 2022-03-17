import Repository from "./Repository";
import { LoggerEnum } from "../../common/enums/logger.enum";

class MngUserRepository extends Repository {
  private collection = "users";

  listUser(args: Record<string, any>): Promise<Record<string, any>[]> {
    return new Promise(async (resolve, reject) => {
      const whereArray = [];
      if ("email" in args) whereArray.push(` email = '${args.email}' `);
      if ("user_id" in args) whereArray.push(` user_id = '${args.user_id}' `);
      const whereStr = whereArray.join(" and ");

      await super
        .readTable({ table: " mng_users ", where: whereStr }, pg.pool_cloud)
        .then((response) => {
          resolve(response);
        })
        .catch((err) => {
          logger(`{red} error listUser {reset}`);
          logger(err.stack, LoggerEnum.ERROR);
          reject(err);
        });
    });
  }

  async upsert(data: Record<string, any>, schema: Record<string, any>) {
    return await new Promise(async (resolve, reject) => {
      const query = super.getUpsertQuery(data, schema);

      await super
        .executeQuery({ source: pg.pool_cloud, query })
        .then((qres) => {
          const returnData: Record<string, any> = {};
          if ((data.id || 0) == 0) {
            const lastID = qres.qres.rows[0].table_id;
            returnData.saved_id = lastID;
          } else {
            returnData.saved_id = data.id;
          }

          resolve({ result: true, data: returnData });
        })
        .catch((err) => {
          logger(`{red}${err.stack}{reset}`, LoggerEnum.ERROR);
          reject({ result: false });
        });
    });
  }
}

export default new MngUserRepository();
