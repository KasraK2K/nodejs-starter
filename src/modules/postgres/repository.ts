import PgRepository from "../../base/repository/PgRepository";
import { IPagination, IUserCreate } from "./common/interface";

class PostgresRepository extends PgRepository {
  private table = "users";

  public async list(pagination: IPagination): Promise<Record<string, any>> {
    return new Promise(async (resolve, reject) => {
      await super
        .paginate(this.table, ["password"], pagination)
        .then((response) => resolve(response))
        .catch((err) => reject(err));
    });
  }

  public async create(args: IUserCreate): Promise<Record<string, any>> {
    const { user_name, password, first_name, last_name, email, phone, gender } = args;
    const query = `
      INSERT INTO ${this.table}
      (user_name, password, first_name, last_name, email, phone, gender)
      VALUES ('${user_name}', '${password}', '${first_name}', '${last_name}', '${email}', '${phone}', '${gender}')
      RETURNING *;
    `;

    return new Promise(async (resolve, reject) => {
      await super
        .executeQuery(query)
        .then((response) => resolve(response))
        .catch((err) => reject(err));
    });
  }
}

export default new PostgresRepository();