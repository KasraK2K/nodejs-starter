import bcrypt from "bcryptjs";

class Logic {
  protected hashPasword(password: string): string {
    const salt = bcrypt.genSaltSync(7);
    return bcrypt.hashSync(password, salt);
  }

  protected comparePassword(password: string, hashPassword: string): boolean {
    return bcrypt.compareSync(password, hashPassword);
  }
}

export default Logic;
