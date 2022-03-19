import BaseLogic from "../../base/logic/BaseLogic";
import postgresRepository from "./repository";
import _ from "lodash";
import { IUserList } from "./common/interface";

class PostgresLogic extends BaseLogic {
  public async list(): Promise<IUserList> {
    const result = await postgresRepository.list();
    return _.assign({ rowCount: result.rowCount, rows: result.rows });
  }
}

export default new PostgresLogic();
