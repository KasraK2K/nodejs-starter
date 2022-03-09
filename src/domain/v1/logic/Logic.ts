import bcrypt from "bcryptjs";

class Logic {
  protected async hashGen(password: string) {
    const salt = await Logic.saltGen();
    return await bcrypt.hash(password, salt);
  }

  private static async saltGen() {
    return await bcrypt.genSalt(Math.floor(Math.random() * (20 - 10) + 10));
  }
}

export default Logic;
