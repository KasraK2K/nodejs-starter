import { hashGen } from "./../../common/functions/bcrypt";
import BaseLogic from "../../base/logic/BaseLogic";
import { IUserCreate, IUserGetOne, IUserRemove, IUserUpdate } from "./common/interface";
import mongoDbRepository from "./repository";
import _ from "lodash";

class MongoDbLogic extends BaseLogic {
  public async selectAll(args: Partial<IUserGetOne>): Promise<Record<string, any>> {
    return new Promise(async (resolve, reject) => {
      const { valid, errors } = validator(schema.find, args);
      if (!valid) return reject({ result: false, error_code: 3002, errors });
      else
        await mongoDbRepository
          .selectAll(args)
          .then((response) => resolve({ result: true, data: response }))
          .catch((err) => reject({ result: false, ...err }));
    });
  }

  public async selectOne(args: Partial<IUserGetOne>): Promise<Record<string, any>> {
    return new Promise(async (resolve, reject) => {
      const { valid, errors } = validator(schema.findOne, args);
      if (!valid) return reject({ result: false, error_code: 3002, errors });
      else
        await mongoDbRepository
          .selectOne(args)
          .then((response) => resolve({ result: true, data: response }))
          .catch((err) => reject({ result: false, ...err }));
    });
  }

  public async create(args: IUserCreate): Promise<Record<string, any>> {
    return new Promise(async (resolve, reject) => {
      const { valid, errors } = validator(schema.user.create, args);
      if (!valid) return reject({ result: false, error_code: 3002, errors });
      else {
        args.password = hashGen(args.password);
        await mongoDbRepository
          .create(args)
          .then((response) => resolve({ result: true, data: response }))
          .catch((err) => reject({ result: false, ...err }));
      }
    });
  }

  public async edit(args: Partial<IUserUpdate>): Promise<Record<string, any>> {
    return new Promise(async (resolve, reject) => {
      const { valid, errors } = validator(schema.user.edit, args);

      if (!valid) return reject({ result: false, error_code: 3002, errors });
      else {
        args.password = args.password ? hashGen(args.password) : "";
        await mongoDbRepository
          .edit({ id: args.id }, _.omit(args, ["id"]))
          .then((response) => resolve({ result: true, data: response }))
          .catch((err) => reject({ result: false, ...err }));
      }
    });
  }

  public async upsert(args: Partial<IUserUpdate>): Promise<Record<string, any>> {
    return new Promise(async (resolve, reject) => {
      const { valid, errors } = validator(schema.user.upsert, args);
      if (!valid) return reject({ result: false, error_code: 3002, errors });
      else {
        args.password = args.password ? hashGen(args.password) : "";
        await mongoDbRepository
          .upsert({ id: args.id }, _.omit(args, ["id"]))
          .then((response) => resolve({ result: true, data: response }))
          .catch((err) => reject({ result: false, ...err }));
      }
    });
  }

  public async safeRemove(args: IUserRemove): Promise<Record<string, any>> {
    return new Promise(async (resolve, reject) => {
      const { valid, errors } = validator(schema.id, args);
      if (!valid) return reject({ result: false, error_code: 3002, errors });
      else
        await mongoDbRepository
          .safeRemove(args)
          .then((response) => resolve({ result: true, data: response }))
          .catch((err) => reject({ result: false, ...err }));
    });
  }

  public async remove(args: IUserRemove): Promise<Record<string, any>> {
    return new Promise(async (resolve, reject) => {
      const { valid, errors } = validator(schema.id, args);
      if (!valid) return reject({ result: false, error_code: 3002, errors });
      else
        await mongoDbRepository
          .remove(args)
          .then((response) => resolve({ result: true, data: response }))
          .catch((err) => reject({ result: false, ...err }));
    });
  }

  public async recover(args: IUserRemove): Promise<Record<string, any>> {
    return new Promise(async (resolve, reject) => {
      const { valid, errors } = validator(schema.id, args);
      if (!valid) return reject({ result: false, error_code: 3002, errors });
      else
        await mongoDbRepository
          .recover(args)
          .then((response) => resolve({ result: true, data: response }))
          .catch((err) => reject({ result: false, ...err }));
    });
  }
}

export default new MongoDbLogic();
