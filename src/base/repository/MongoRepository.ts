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
        .updateOne(findArgs, { $set: args })
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
}

export default MongoRepository;
