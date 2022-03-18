import BaseRepository from "@/src/base/repository/PgRepository";
import { QueryResult } from "pg";

class PostgresRepository extends BaseRepository {
  public async list(): Promise<QueryResult<any>> {
    return await pg.pool.query(`
      SELECT * FROM <table>
      WHERE <condition>
      ORDER BY <order>
      LIMIT <limit>
      OFFSET <offset>
    `);
  }
}

export default new PostgresRepository();
