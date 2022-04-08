import { hashGen } from "./../../common/functions/bcrypt";
import BaseLogic from "../../base/logic/BaseLogic";
import { IPagination, IUserCreate, IUserGetOne, IUserRemove, IUserUpdate } from "./utils/interface";
import { postgresqlSchema } from "./utils/schema";
import postgresRepository from "./repository";

class PostgresLogic extends BaseLogic {
  public async selectAll(pagination: IPagination): Promise<Record<string, any>> {
    return new Promise(async (resolve, reject) => {
      const { valid, errors } = validator(schema.pagination, pagination);
      if (!valid) return reject({ result: false, error_code: 3002, errors });

      await postgresRepository
        .selectAll(pagination)
        .then((response) => resolve({ result: true, data: response }))
        .catch((err) => reject({ result: false, ...err }));
    });
  }

  public async selectOne(args: Partial<IUserGetOne>): Promise<Record<string, any>> {
    return new Promise(async (resolve, reject) => {
      const { valid, errors } = validator(postgresqlSchema.find, args);
      if (!valid) return reject({ result: false, error_code: 3002, errors });

      await postgresRepository
        .selectOne(args)
        .then((response) => resolve({ result: true, data: response }))
        .catch((err) => reject({ result: false, ...err }));
    });
  }

  public async create(args: IUserCreate): Promise<Record<string, any>> {
    return new Promise(async (resolve, reject) => {
      const { valid, errors } = validator(postgresqlSchema.user.create, args);
      if (!valid) return reject({ result: false, error_code: 3002, errors });

      args.password = hashGen(args.password);

      await postgresRepository
        .create(args)
        .then((response) => resolve({ result: true, data: response }))
        .catch((err) => reject({ result: false, ...err }));
    });
  }

  public async edit(args: Partial<IUserUpdate>): Promise<Record<string, any>> {
    return new Promise(async (resolve, reject) => {
      const { valid, errors } = validator(postgresqlSchema.user.edit, args);
      if (!valid) return reject({ result: false, error_code: 3002, errors });

      args.password = args.password ? hashGen(args.password) : "";

      await postgresRepository
        .edit(args)
        .then((response) => resolve({ result: true, data: response }))
        .catch((err) => reject({ result: false, ...err }));
    });
  }

  public async upsert(args: Partial<IUserUpdate> | IUserCreate): Promise<Record<string, any>> {
    return new Promise(async (resolve, reject) => {
      if ("id" in args)
        await this.edit(args as Partial<IUserUpdate>)
          .then((response) => resolve(response))
          .catch((err) => reject(err));
      else
        await this.create(args as IUserCreate)
          .then((response) => resolve(response))
          .catch((err) => reject(err));
    });
  }

  public async safeRemove(args: IUserRemove): Promise<Record<string, any>> {
    return new Promise(async (resolve, reject) => {
      const { valid, errors } = validator(postgresqlSchema.id, args);
      if (!valid) return reject({ result: false, error_code: 3002, errors });

      await postgresRepository
        .safeRemove(args)
        .then((response) => resolve({ result: true, data: response }))
        .catch((err) => reject({ result: false, ...err }));
    });
  }

  public async remove(args: IUserRemove): Promise<Record<string, any>> {
    return new Promise(async (resolve, reject) => {
      const { valid, errors } = validator(postgresqlSchema.id, args);
      if (!valid) return reject({ result: false, error_code: 3002, errors });

      await postgresRepository
        .remove(args)
        .then((response) => resolve({ result: true, data: response }))
        .catch((err) => reject({ result: false, ...err }));
    });
  }

  public async recover(args: IUserRemove): Promise<Record<string, any>> {
    return new Promise(async (resolve, reject) => {
      const { valid, errors } = validator(postgresqlSchema.id, args);
      if (!valid) return reject({ result: false, error_code: 3002, errors });

      await postgresRepository
        .recover(args)
        .then((response) => resolve({ result: true, data: response }))
        .catch((err) => reject({ result: false, ...err }));
    });
  }

  public testBuilder(): Promise<Record<string, any>> {
    return new Promise(async (resolve, reject) => {
      await postgresRepository
        .testBuilder()
        .then((response) => resolve({ result: true, data: response }))
        .catch((err) => reject({ result: false, ...err }));
    });
  }
}

export default new PostgresLogic();
