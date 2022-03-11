import { injectable } from "inversify";
import Repository from "./Repository";

@injectable()
class UserRepository extends Repository {
  private collection = "users";

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

export default UserRepository;
