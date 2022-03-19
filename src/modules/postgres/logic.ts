import BaseLogic from "../../base/logic/BaseLogic";
import postgresRepository from "./repository";

class PostgresLogic extends BaseLogic {
  public async list(): Promise<Record<string, any>> {
    return new Promise(async (resolve, reject) => {
      await postgresRepository
        .list()
        .then((response) => resolve({ result: true, data: response }))
        .catch((err) => reject({ result: false, ...err }));
    });
  }
}

export default new PostgresLogic();
