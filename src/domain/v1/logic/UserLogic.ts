import Logic from "./Logic";
import { Request } from "express";
import { IResGen } from "@/common/interfaces/information";
import userRepository from "../repository/UserRepository";

class UserLogic extends Logic {
  async create(req: Request): Promise<IResGen> {
    const { name, email, password } = req.body;
    const { valid, errors } = validator(schema.user.create, req.body);

    // ────────────────────────────────────────── CHECK VALIDATION ─────
    if (!valid) return { req, success: false, error: 3002, error_data: errors };

    // // ───────────────────────────────── CHECK IS EMAIL REGISTERED ─────
    const userExist = await userRepository.findByEmail(email);
    if (userExist) return { req, success: false, error: 3003 };

    // ─────────────────────────────────────────────── CREATE USER ─────
    const hash = await super.hashGen(password);
    const user = await userRepository.create(name, email, hash);
    return { req, success: true, data: user };
  }
}

export default new UserLogic();
