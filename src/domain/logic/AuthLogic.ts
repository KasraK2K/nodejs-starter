import Logic from "./Logic";
import userRepository from "../repository/UserRepository";

class UserLogic extends Logic {
  async login(params: Record<string, any>): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const value = objectValidator(params, objectSchema.login);

      if ("errors" in value) reject({ result: false, error_code: 3242, error_user_messages: value.errors });
      else
        await userRepository
          .listUser(value.email)
          .then((response) => resolve({ result: true, data: response }))
          .catch((err) => reject(err));
    });
  }
}

export default new UserLogic();
