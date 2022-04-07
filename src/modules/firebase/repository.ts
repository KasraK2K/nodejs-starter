import MongoRepository from "../../base/repository/MongoRepository";

class FirebaseRepository extends MongoRepository {
  private table = "users";

  public async selectOne(args: { id: string }): Promise<Record<string, any>> {
    return new Promise(async (resolve, reject) => {
      await this.findOne(this.table, args, ["password"])
        .then((result) => resolve(result))
        .catch((err) => reject(err));
    });
  }
}

export default new FirebaseRepository();
