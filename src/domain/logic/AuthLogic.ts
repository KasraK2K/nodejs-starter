import Logic from "./Logic";
import userRepository from "../repository/UserRepository";

class UserLogic extends Logic {
  async login(params: Record<string, any>): Promise<any> {
    return new Promise((resolve, reject) => {
      const value = objectValidator(params, objectSchema.login);

      if ("errors" in value) reject({ errors: value.errors });
      else
        userRepository
          .listUser(value.email)
          .then((response) => resolve(response))
          .catch((err) => reject(err));
    });
  }
}

export default new UserLogic();
