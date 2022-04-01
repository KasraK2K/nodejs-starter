import PgRepository from "../../base/repository/PgRepository";
import { IPagination, IUserCreate, IUserGetOne, IUserUpdate } from "./common/interface";

class PostgresRepository extends PgRepository {
  private table = "users";

  public async selectAll(pagination: IPagination): Promise<Record<string, any>> {
    return new Promise(async (resolve, reject) => {
      await super
        .paginate(this.table, pagination, ["password"])
        .then((response) => resolve(response))
        .catch((err) => reject(err));
    });
  }

  public async selectOne(args: Partial<IUserGetOne>): Promise<Record<string, any>> {
    return new Promise(async (resolve, reject) => {
      await super
        .findOne(this.table, args, ["password"])
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

  public async edit(args: Partial<IUserUpdate>): Promise<Record<string, any>> {
    return new Promise(async (resolve, reject) => {
      await super
        .update(this.table, args, ["password"])
        .then((response) => resolve(response))
        .catch((err) => reject(err));
    });
  }

  public testBuilder() {
    // return super.select(["name", "age"]).from(this.table).where("id = ?? AND age > ??", [2, 18]).getSQL();
    return super
      .innerJoin("table", "table1.id = table2.id")
      .select(["name", "age"])
      .from(this.table)
      .where(["name = '??'"], ["Kasra"])
      .innerJoin("table", "table1.id = table2.id")
      .orderBy(["id", "age"], ["desc", "asc"])
      .groupBy(["name", "age"])
      .innerJoin("table", "table1.id = table2.id")
      .limit(10)
      .offset(10)
      .innerJoin("table", "table1.id = table2.id")
      .getSQL();
  }
}

export default new PostgresRepository();
