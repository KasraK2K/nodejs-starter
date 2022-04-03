import { hashGen } from "./../../common/functions/bcrypt";
import BaseLogic from "../../base/logic/BaseLogic";
import { IUserCreate, IUserGetOne, IUserUpdate } from "./common/interface";
import mongoDbRepository from "./repository";
import _ from "lodash";

class MongoDbLogic extends BaseLogic {
  public async selectAll(args: Record<string, any>): Promise<Record<string, any>> {
    return new Promise(async (resolve, reject) => {
      const { valid, errors } = validator(schema.mongo.find, args);
      if (!valid) return reject({ result: false, error_code: 3002, errors });

      await mongoDbRepository
        .selectAll(args)
        .then((response) => resolve({ result: true, data: response }))
        .catch((err) => reject({ result: false, ...err }));
    });
  }

  public async selectOne(args: Partial<IUserGetOne>): Promise<Record<string, any>> {
    return new Promise(async (resolve, reject) => {
      const { valid, errors } = validator(schema.mongo.find, args);
      if (!valid) return reject({ result: false, error_code: 3002, errors });

      await mongoDbRepository
        .selectOne(args)
        .then((response) => resolve({ result: true, data: response }))
        .catch((err) => reject({ result: false, ...err }));
    });
  }

  public async create(args: IUserCreate): Promise<Record<string, any>> {
    return new Promise(async (resolve, reject) => {
      const { valid, errors } = validator(schema.mongo.user.create, args);
      if (!valid) return reject({ result: false, error_code: 3002, errors });

      args.password = hashGen(args.password);

      await mongoDbRepository
        .create(args)
        .then((response) => resolve({ result: true, data: response }))
        .catch((err) => reject({ result: false, ...err }));
    });
  }

  public async edit(findArgs: Record<string, any>, args: Partial<IUserUpdate>): Promise<Record<string, any>> {
    return new Promise(async (resolve, reject) => {
      const findValidation = validator(schema.mongo.find, findArgs);
      const argsValidation = validator(schema.mongo.user.edit, args);

      let errors: Record<string, any>[] = [];

      if (!findValidation.valid && findValidation.errors?.length) errors = [...findValidation.errors];
      if (!argsValidation.valid && argsValidation.errors?.length) errors = [...errors, ...argsValidation.errors];
      if (errors.length) return reject({ result: false, error_code: 3002, errors });

      args.password = args.password ? hashGen(args.password) : "";

      await mongoDbRepository
        .edit(findArgs, args)
        .then((response) => resolve({ result: true, data: response }))
        .catch((err) => reject({ result: false, ...err }));
    });
  }

  public async upsert(args: Record<string, any>): Promise<Record<string, any>> {
    return new Promise(async (resolve, reject) => {
      if ("_id" in args) {
        const findArgs = { id: args._id };
        const updateArgs: Partial<IUserUpdate> = _.omit(args, "id");
        await this.edit(findArgs, updateArgs)
          .then((response) => resolve(response))
          .catch((err) => reject(err));
      } else {
        const createArgs = _.omit(args, "id");
        await this.create(createArgs as IUserCreate)
          .then((response) => resolve(response))
          .catch((err) => reject(err));
      }
    });
  }

  // public async safeRemove(args: IUserRemove): Promise<Record<string, any>> {
  //   return new Promise(async (resolve, reject) => {
  //     const { valid, errors } = validator(schema.mongo.id, args);
  //     if (!valid) return reject({ result: false, error_code: 3002, errors });

  //     await mongoDbRepository
  //       .safeRemove(args)
  //       .then((response) => resolve({ result: true, data: response }))
  //       .catch((err) => reject({ result: false, ...err }));
  //   });
  // }

  // public async remove(args: IUserRemove): Promise<Record<string, any>> {
  //   return new Promise(async (resolve, reject) => {
  //     const { valid, errors } = validator(schema.mongo.id, args);
  //     if (!valid) return reject({ result: false, error_code: 3002, errors });

  //     await mongoDbRepository
  //       .remove(args)
  //       .then((response) => resolve({ result: true, data: response }))
  //       .catch((err) => reject({ result: false, ...err }));
  //   });
  // }

  // public async recover(args: IUserRemove): Promise<Record<string, any>> {
  //   return new Promise(async (resolve, reject) => {
  //     const { valid, errors } = validator(schema.mongo.id, args);
  //     if (!valid) return reject({ result: false, error_code: 3002, errors });

  //     await mongoDbRepository
  //       .recover(args)
  //       .then((response) => resolve({ result: true, data: response }))
  //       .catch((err) => reject({ result: false, ...err }));
  //   });
  // }

  // public testBuilder(): Promise<Record<string, any>> {
  //   return new Promise(async (resolve, reject) => {
  //     await mongoDbRepository
  //       .testBuilder()
  //       .then((response) => resolve({ result: true, data: response }))
  //       .catch((err) => reject({ result: false, ...err }));
  //   });
  // }
}

export default new MongoDbLogic();
