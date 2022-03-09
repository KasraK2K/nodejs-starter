import Repository from "./Repository";

class UserRepository extends Repository {
  private collection = "users";

  async findByEmail(email: string) {
    return await mongo.database.collection(this.collection).findOne({ email });
  }

  async create(name: string, email: string, password: string) {
    return await mongo.database
      .collection(this.collection)
      .insertOne({ name, email, password });
  }
}

export default new UserRepository();
