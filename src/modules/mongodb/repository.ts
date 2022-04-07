import MongoRepository from "../../base/repository/MongoRepository";
import { IUserCreate, IUserGetOne, IUserRemove, IUserRestore, IUserUpdate } from "./common/interface";

class MongoDbRepository extends MongoRepository {
  private table = "users";

  public async selectAll(args: Partial<IUserGetOne> = {}): Promise<Record<string, any>> {
    return new Promise(async (resolve, reject) => {
      await super
        .find(this.table, args, ["password"])
        .then((result) => resolve(result))
        .catch((err) => reject(err));
    });
  }

  public async selectOne(args: Partial<IUserGetOne>): Promise<Record<string, any>> {
    return new Promise(async (resolve, reject) => {
      await this.findOne(this.table, args, ["password"])
        .then((result) => resolve(result))
        .catch((err) => reject(err));
    });
  }

  public async create(args: IUserCreate): Promise<Record<string, any>> {
    return new Promise(async (resolve, reject) => {
      await this.insertOne(this.table, args)
        .then((result) => resolve(result))
        .catch((err) => reject(err));
    });
  }

  public async edit(findArgs: Partial<IUserGetOne>, args: Partial<IUserUpdate>): Promise<Record<string, any>> {
    return new Promise(async (resolve, reject) => {
      await this.updateOne(this.table, findArgs, args)
        .then((result) => resolve(result))
        .catch((err) => reject(err));
    });
  }

  public async upsert(findArgs: Partial<IUserGetOne>, args: Partial<IUserUpdate>): Promise<Record<string, any>> {
    return new Promise(async (resolve, reject) => {
      await this.upsertOne(this.table, findArgs, args, { omits: ["password"], upsert: true })
        .then((result) => resolve(result))
        .catch((err) => reject(err));
    });
  }

  public async safeRemove(args: IUserRemove): Promise<Record<string, any>> {
    return new Promise(async (resolve, reject) => {
      await this.safeDeleteOne(this.table, args)
        .then((result) => resolve(result))
        .catch((err) => reject(err));
    });
  }

  public async remove(args: IUserRemove): Promise<Record<string, any>> {
    return new Promise(async (resolve, reject) => {
      await this.deleteOne(this.table, args)
        .then((result) => resolve(result))
        .catch((err) => reject(err));
    });
  }

  public async recover(args: IUserRestore): Promise<Record<string, any>> {
    return new Promise(async (resolve, reject) => {
      await this.restoreOne(this.table, args)
        .then((result) => resolve(result))
        .catch((err) => reject(err));
    });
  }
}

export default new MongoDbRepository();
