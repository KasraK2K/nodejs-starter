import BaseLogic from "../../base/logic/BaseLogic";
import postgresRepository from "./repository";
import { QueryResult } from "pg";

class PostgresLogic extends BaseLogic {
  public async list(): Promise<QueryResult<any>> {
    return await postgresRepository.list();
  }
}

export default new PostgresLogic();
