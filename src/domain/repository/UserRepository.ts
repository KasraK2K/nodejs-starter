import _ from "lodash";
import Repository from "./Repository";

class UserRepository extends Repository {
  private collection = "users";

  async listUser(args: Record<string, any>): Promise<Record<string, any>[]> {
    return new Promise((resolve, reject) => {
      const whereStr = "";
      const readTableData = _.assign({ table: " mng_users ", where: whereStr }, args);
      super
        .readTable(readTableData, pg.pool_cloud)
        .then((response) => resolve(response))
        .catch((err) => reject(err));
    });
  }
}

export default new UserRepository();
