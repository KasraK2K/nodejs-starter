import { hashGen } from "./../../common/functions/bcrypt";
import BaseLogic from "../../base/logic/BaseLogic";
import { IUserCreate, IUserGetOne, IUserRemove, IUserUpdate } from "./utils/interface";
import { mongodbSchema } from "./utils/schema";
import mongoDbRepository from "./repository";
import _ from "lodash";

class MongoDbLogic extends BaseLogic {
  public async selectAll(args: Partial<IUserGetOne>): Promise<Record<string, any>> {
    return new Promise(async (resolve, reject) => {
      const { valid, errors } = validator(mongodbSchema.find, args);
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
      const { valid, errors } = validator(mongodbSchema.findOne, args);
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
      const { valid, errors } = validator(mongodbSchema.user.create, args);
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
      const { valid, errors } = validator(mongodbSchema.user.edit, args);

      if (!valid) return reject({ result: false, error_code: 3002, errors });
      else {
        args.password = args.password ? hashGen(args.password) : "";
        await mongoDbRepository
          .edit({ _id: args._id }, _.omit(args, ["_id"]))
          .then((response) => resolve({ result: true, data: response }))
          .catch((err) => reject({ result: false, ...err }));
      }
    });
  }

  public async upsert(args: Partial<IUserUpdate>): Promise<Record<string, any>> {
    return new Promise(async (resolve, reject) => {
      const { valid, errors } = validator(mongodbSchema.user.upsert, args);
      if (!valid) return reject({ result: false, error_code: 3002, errors });
      else {
        args.password = args.password ? hashGen(args.password) : "";
        await mongoDbRepository
          .upsert({ _id: args._id }, _.omit(args, ["_id"]))
          .then((response) => resolve({ result: true, data: response }))
          .catch((err) => reject({ result: false, ...err }));
      }
    });
  }

  public async safeRemove(args: IUserRemove): Promise<Record<string, any>> {
    return new Promise(async (resolve, reject) => {
      const { valid, errors } = validator(mongodbSchema._id, args);
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
      const { valid, errors } = validator(mongodbSchema._id, args);
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
      const { valid, errors } = validator(mongodbSchema._id, args);
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
