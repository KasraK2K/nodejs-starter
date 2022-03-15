import _ from "lodash";
import Repository from "./Repository";

class UserRepository extends Repository {
  private collection = "users";

  async listUser(args: Record<string, any>): Promise<Record<string, any>[]> {
    return new Promise(async (resolve, reject) => {
      const whereStr = "";
      const readTableData = _.assign({ table: " mng_users ", where: whereStr }, args);
      await super
        .readTable(readTableData, pg.pool_cloud)
        .then((response) => resolve(response))
        .catch((err) => reject(err));
    });
  }

  async findByEmail(email: string) {
    return await mongo.database
      .collection(this.collection)
      .findOne({ email })
      .then((response) => response)
      .catch((err) => ({
        error_code: 14176,
        error_user_messages: [err.message],
      }));
  }

  async create(name: string, email: string, password: string) {
    return await mongo.database
      .collection(this.collection)
      .insertOne({ name, email, password })
      .then((response) => response)
      .catch((err) => ({
        error_code: 14176,
        error_user_messages: [err.message],
      }));
  }
}

export default new UserRepository();
