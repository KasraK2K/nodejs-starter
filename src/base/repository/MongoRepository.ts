import _ from "lodash";
import { ObjectId } from "mongodb";

class MongoRepository {
  // ─── SELECT ALL ─────────────────────────────────────────────────────────────────
  protected find(
    tableName: string,
    args: Record<string, any> = {},
    omits: string[] = []
  ): Promise<Record<string, any>[]> {
    return new Promise(async (resolve, reject) => {
      args = this.sanitizeArgs(args);

      await mongo
        .collection(tableName)
        .find(args, { projection: this.generateProjection(omits) })
        .toArray()
        .then((response) => resolve(response))
        .catch((err) => reject(err));
    });
  }

  // ─── SELECT ONE ─────────────────────────────────────────────────────────────────
  protected findOne(
    tableName: string,
    args: Record<string, any> = {},
    omits: string[] = []
  ): Promise<Record<string, any>> {
    return new Promise(async (resolve, reject) => {
      args = this.sanitizeArgs(args);

      await mongo
        .collection(tableName)
        .findOne(args, { projection: this.generateProjection(omits) })
        .then((response) => resolve(response as Record<string, any>))
        .catch((err) => reject(err));
    });
  }

  // ─── INSERT ONE ─────────────────────────────────────────────────────────────────
  protected insertOne(
    tableName: string,
    args: Record<string, any>,
    omits: string[] = []
  ): Promise<Record<string, any>> {
    return new Promise(async (resolve, reject) => {
      args = this.sanitizeArgs(args);
      _.assign(args, { createdAt: new Date(), updatedAt: new Date() });

      await mongo
        .collection(tableName)
        .insertOne(args)
        .then(async () => await this.findOne(tableName, args, omits).then((response) => resolve(response)))
        .catch((err) => reject(err));
    });
  }

  // ─── UPDATE ONE ─────────────────────────────────────────────────────────────────
  protected updateOne(
    tableName: string,
    findArgs: Record<string, any>,
    args: Record<string, any>,
    omits: string[] = []
  ): Promise<Record<string, any>> {
    return new Promise(async (resolve, reject) => {
      findArgs = this.sanitizeArgs(findArgs);
      args = this.sanitizeArgs(args);

      await mongo
        .collection(tableName)
        .updateOne(findArgs, { $set: args, $currentDate: { updatedAt: true } })
        .then(async () => await this.findOne(tableName, args, omits).then((response) => resolve(response)))
        .catch((err) => reject(err));
    });
  }

  // ─── UPSERT ONE ─────────────────────────────────────────────────────────────────
  protected upsertOne(
    tableName: string,
    findArgs: Record<string, any>,
    args: Record<string, any>,
    options: Record<string, any> = { omits: [], upsert: true }
  ): Promise<Record<string, any>> {
    return new Promise(async (resolve, reject) => {
      const { upsert, omits } = options;
      findArgs = this.sanitizeArgs(findArgs);
      args = this.sanitizeArgs(args);
      const date = new Date();

      await mongo
        .collection(tableName)
        .updateOne(findArgs, { $set: { ...args, updatedAt: date }, $setOnInsert: { createdAt: date } }, { upsert })
        .then(async () => await this.findOne(tableName, args, omits).then((response) => resolve(response)))
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    });
  }

  // ─── SAFE DELETE ────────────────────────────────────────────────────────────────
  protected safeDelete(
    tableName: string,
    args: Record<string, any>,
    omits: string[] = []
  ): Promise<Record<string, any>> {
    return new Promise(async (resolve, reject) => {
      args = this.sanitizeArgs(args);

      await mongo
        .collection(tableName)
        .updateOne(args, { $set: { deletedAt: new Date() } })
        .then(async () => await this.findOne(tableName, args, omits).then((response) => resolve(response)))
        .catch((err) => reject(err));
    });
  }

  // ────────────────────────────────────────────────────── GENERATE PROJECTION ─────
  private generateProjection(omits: string[]) {
    const projection: Record<string, any> = {};
    omits.forEach((omit) => (projection[omit] = 0));
    return projection;
  }

  private sanitizeArgs(args: Record<string, any>): Record<string, any> {
    if ("id" in args) {
      args._id = new ObjectId(args.id);
      delete args.id;
      return args;
    } else if ("_id" in args) {
      args._id = new ObjectId(args._id);
      return args;
    } else return args;
  }

  private isObjectId(id: string): boolean {
    return ObjectId.isValid(id);
  }
}

export default MongoRepository;
