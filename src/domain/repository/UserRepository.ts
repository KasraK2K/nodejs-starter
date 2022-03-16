import { LoggerEnum } from "../../common/enums/logger.enum";
import Repository from "./Repository";

class UserRepository extends Repository {
  private collection = "users";

  listUser(args: Record<string, any>): Promise<Record<string, any>[]> {
    return new Promise(async (resolve, reject) => {
      const whereArray = [];
      if ("email" in args) whereArray.push(` email = '${args.email}' `);
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
}

export default new UserRepository();
