import { hashGen } from "./../../common/functions/bcrypt";
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
      await this.insertOne(this.table, args, ["password"])
        .then((response) => resolve(response))
        .catch((err) => reject(err));
    });
  }

  public async edit(args: Partial<IUserUpdate>): Promise<Record<string, any>> {
    return new Promise(async (resolve, reject) => {
      await this.updateOne(this.table, args, ["password"])
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
      // ─────────────────────────────────────── SELECT WITH BUILDER ─────
      // await this.select(["first_name", "last_name"])
      //   .from(this.table)
      //   .where("last_name = '??'", ["Karami"])
      //   .orderBy("first_name", "ASC")
      //   .limit(1)
      //   .offset(1)
      //   .getMany()
      //   .then((response) => resolve(response))
      //   .catch((err) => reject(err));

      // ─────────────────────────────────────── INSERT WITH BUILDER ─────
      // await this.insert(this.table, {
      //   user_name: "test3",
      //   password: hashGen("test"),
      //   first_name: "Test3",
      //   last_name: "Tester3",
      //   email: "test3@email.com",
      //   phone: "+989183619393",
      //   gender: "female",
      // })
      //   .exec({ omits: ["password"] })
      //   .then((response) => resolve(response))
      //   .catch((err) => reject(err));

      // ─────────────────────────────────────── UPDATE WITH BUILDER ─────
      await this.update(this.table, "97c1abd1-d173-46a8-842e-a61a6873fbc3", {
        password: hashGen("12345678"),
        first_name: "Kasra",
        last_name: "Karami",
        email: "kasra@email.com",
        phone: "+989183619290",
        gender: "male",
      })
        .exec({ omits: ["password"] })
        .then((response) => resolve(response))
        .catch((err) => reject(err));
    });
  }
}

export default new PostgresRepository();
