import BaseRepository from "../../base/repository/PgRepository";
import { LoggerEnum } from "../../common/enums/logger.enum";

class PostgresRepository extends BaseRepository {
  private table = "usersa";

  public list(): Promise<Record<string, any>> {
    return new Promise(async (resolve, reject) => {
      await pg.pool
        .query(` SELECT * FROM ${this.table}`)
        .then((response) => resolve({ rowCount: response.rowCount, rows: response.rows }))
        .catch((err) => {
          if (err.code === "42P01") {
            logger(`{red}${err.stack}{reset}`, LoggerEnum.ERROR);
            logger(`{red}Database Table Not Found{reset}`, LoggerEnum.ERROR);
            return reject({ result: false, error_code: 3007 });
          } else {
            logger(`{red}${err.message}{reset}`, LoggerEnum.ERROR);
            logger(`{red}${err.stack}{reset}`, LoggerEnum.ERROR);
            return reject(err);
          }
        });
    });
  }
}

export default new PostgresRepository();
