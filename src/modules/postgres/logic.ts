import { hashGen } from "./../../common/functions/bcrypt";
import BaseLogic from "../../base/logic/BaseLogic";
import { IPagination, IUserCreate, IUserGetOne, IUserUpdate } from "./common/interface";
import postgresRepository from "./repository";

class PostgresLogic extends BaseLogic {
  public async getAll(pagination: IPagination): Promise<Record<string, any>> {
    return new Promise(async (resolve, reject) => {
      const { valid, errors } = validator(schema.pagination, pagination);
      if (!valid) return reject({ result: false, error_code: 3002, errors });

      await postgresRepository
        .getAll(pagination)
        .then((response) => resolve({ result: true, data: response }))
        .catch((err) => reject({ result: false, ...err }));
    });
  }

  public async getOne(args: Partial<IUserGetOne>): Promise<Record<string, any>> {
    return new Promise(async (resolve, reject) => {
      const { valid, errors } = validator(schema.findOne, args);
      if (!valid) return reject({ result: false, error_code: 3002, errors });

      await postgresRepository
        .getOne(args)
        .then((response) => resolve({ result: true, data: response }))
        .catch((err) => reject({ result: false, ...err }));
    });
  }

  public async create(args: IUserCreate): Promise<Record<string, any>> {
    return new Promise(async (resolve, reject) => {
      const { valid, errors } = validator(schema.user.create, args);
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
      const { valid, errors } = validator(schema.user.edit, args);
      if (!valid) return reject({ result: false, error_code: 3002, errors });

      args.password = args.password ? hashGen(args.password) : "";

      await postgresRepository
        .edit(args)
        .then((response) => resolve({ result: true, data: response }))
        .catch((err) => reject({ result: false, ...err }));
    });
  }
}

export default new PostgresLogic();
