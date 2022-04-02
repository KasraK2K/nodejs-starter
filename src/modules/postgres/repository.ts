import PgRepository from "../../base/repository/PgRepository";
import { IPagination, IUserCreate, IUserGetOne, IUserRemove, IUserRestore, IUserUpdate } from "./common/interface";

class PostgresRepository extends PgRepository {
  private table = "users";

  public async selectAll(pagination: IPagination): Promise<Record<string, any>> {
    return new Promise(async (resolve, reject) => {
      await this.paginate(this.table, pagination, ["password"])
        .then((response) => resolve(response))
        .catch((err) => reject(err));
    });
  }

  public async selectOne(args: Partial<IUserGetOne>): Promise<Record<string, any>> {
    return new Promise(async (resolve, reject) => {
      await this.findOne(this.table, args, ["password"])
        .then((response) => resolve(response))
        .catch((err) => reject(err));
    });
  }

  public async create(args: IUserCreate): Promise<Record<string, any>> {
    return new Promise(async (resolve, reject) => {
      await this.insert(this.table, args, ["password"])
        .then((response) => resolve(response))
        .catch((err) => reject(err));
    });
  }

  public async edit(args: Partial<IUserUpdate>): Promise<Record<string, any>> {
    return new Promise(async (resolve, reject) => {
      await this.update(this.table, args, ["password"])
        .then((response) => resolve(response))
        .catch((err) => reject(err));
    });
  }

  public async safeRemove(args: IUserRemove): Promise<Record<string, any>> {
    return new Promise(async (resolve, reject) => {
      await this.safeDeleteOne(this.table, args.id, ["password"])
        .then((response) => resolve(response))
        .catch((err) => reject(err));
    });
  }

  public async remove(args: IUserRemove): Promise<Record<string, any>> {
    return new Promise(async (resolve, reject) => {
      await this.deleteOne(this.table, args.id, ["password"])
        .then((response) => resolve(response))
        .catch((err) => reject(err));
    });
  }

  public async restore(args: IUserRestore): Promise<Record<string, any>> {
    return new Promise(async (resolve, reject) => {
      await this.restoreOne(this.table, args.id, ["password"])
        .then((response) => resolve(response))
        .catch((err) => reject(err));
    });
  }

  public testBuilder(): Promise<Record<string, any>> {
    return new Promise(async (resolve, reject) => {
      await this.select(["first_name", "last_name"])
        .from(this.table)
        .where("last_name = '??'", ["Karami"])
        .orderBy("first_name", "ASC")
        .limit(1)
        .offset(1)
        .getMany()
        .then((response) => resolve(response))
        .catch((err) => reject(err));
    });
  }
}

export default new PostgresRepository();
