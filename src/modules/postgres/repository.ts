import PgRepository from "../../base/repository/PgRepository";

class PostgresRepository extends PgRepository {
  private table = "usersa";

  public async list(): Promise<Record<string, any>> {
    return new Promise(async (resolve, reject) => {
      await super
        .executeQuery(` SELECT * FROM ${this.table}`)
        .then((response) => resolve(response))
        .catch((err) => reject(err));
    });
  }
}

export default new PostgresRepository();
