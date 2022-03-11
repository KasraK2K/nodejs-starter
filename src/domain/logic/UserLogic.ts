import Logic from "./Logic";
import { Request } from "express";
import UserRepository from "../repository/UserRepository";
import { saltGen, hashGen } from "../../common/functions/bcrypt";

class UserLogic extends Logic {
  constructor(private userRepository: UserRepository) {
    super();
    this.userRepository = userRepository;
  }

  async create(req: Request): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const { name, email, password } = req.body;
      const { valid, errors } = validator(schema.user.create, req.body);

      // ────────────────────────────────────────── CHECK VALIDATION ─────
      if (!valid) {
        reject({
          error_code: 3002,
          error_user_messages: errors,
        });
        return;
      }

      // ───────────────────────────────── CHECK IS EMAIL REGISTERED ─────
      const userExist = await this.userRepository.findByEmail(email);
      if (userExist) {
        reject({
          error_code: 3003,
          error_user_messages: errors,
        });
        return;
      }

      // ─────────────────────────────────────────────── CREATE USER ─────
      const hash = await hashGen(password);
      const user = await this.userRepository.create(name, email, hash);

      resolve({ result: true, data: user });
    });
  }
}

export default UserLogic;
