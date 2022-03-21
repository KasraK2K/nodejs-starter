import PgRepository from "../../base/repository/PgRepository";
import { IPagination, IUserCreate } from "./common/interface";

class PostgresRepository extends PgRepository {
  private table = "users";

  public async getAll(pagination: IPagination): Promise<Record<string, any>> {
    return new Promise(async (resolve, reject) => {
      await super
        .paginate(this.table, pagination, ["password"])
        .then((response) => resolve(response))
        .catch((err) => reject(err));
    });
  }

  public async getOne(id: string): Promise<Record<string, any>> {
    return new Promise(async (resolve, reject) => {
      await super
        .findOne(this.table, id, ["password"])
        .then((response) => resolve(response))
        .catch((err) => reject(err));
    });
  }

  public async create(args: IUserCreate): Promise<Record<string, any>> {
    return new Promise(async (resolve, reject) => {
      await super
        .insert(this.table, args, ["password"])
        .then((response) => resolve(response))
        .catch((err) => reject(err));
    });
  }
}

export default new PostgresRepository();
