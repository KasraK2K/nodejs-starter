import BaseRepository from "../../base/repository/PgRepository";
import { LoggerEnum } from "../../common/enums/logger.enum";
import { QueryResult } from "pg";

class PostgresRepository extends BaseRepository {
  private table = "users";

  public async list(): Promise<QueryResult<any>> {
    return await pg.pool
      .query(` SELECT * FROM ${this.table}`)
      .then((result) => result)
      .catch((err) => {
        logger(`{red}Error in PostgresRepository.list{reset}`, LoggerEnum.ERROR);
        logger(err.stack, LoggerEnum.ERROR);
        return err;
      });
  }
}

export default new PostgresRepository();
