import "../../boot/envirement";

class K2Token {
  constructor(
    private secretKey = process.env.SECURE_SECRET_KEY ?? "Jsa0lmxkVuTFhJpYXQiOjObFkrNmV4sInRSjFjMlYplzvCCwP3",
    private secretFirstKeySeparator = process.env.SECURE_SECRET_FIRST_SEPARATOR ??
      "NiMjVuTFhObFk0SmxkQzFyWlhrNmV5SjFjMlZ5WDJsa0lqb",
    private secretSecondKeySeparator = process.env.SECURE_SECRET_SECOND_SEPARATOR ??
      "tk6MZRVCI6IkpXVCObFk0SmxVuTFV5SjFjMlZ5WMDM5NjV9"
  ) {}

  public generateToken(payload: any): string {
    const buffSecretKey = Buffer.from(this.secretKey, "utf-8");
    const strSecretKey = buffSecretKey.toString("base64");

    const buffFirstKeySep = Buffer.from(this.secretFirstKeySeparator, "utf-8");
    const strFirstKeySep = buffFirstKeySep.toString("base64");

    const bufferArg = Buffer.from(JSON.stringify(payload), "utf-8");
    const strArg = bufferArg.toString("base64");

    const buffSecondKeySep = Buffer.from(this.secretSecondKeySeparator, "utf-8");
    const strSecondKeySep = buffSecondKeySep.toString("base64");

    return strSecretKey + strFirstKeySep + strArg + strSecondKeySep;
  }

  public verifyToken(token: string): any {
    const buff = Buffer.from(token, "base64");
    const str = buff.toString("utf-8");
    const key = str.slice(0, str.indexOf(this.secretFirstKeySeparator));
    const stringData = str.slice(
      str.indexOf(this.secretFirstKeySeparator) + this.secretFirstKeySeparator.length,
      str.indexOf(this.secretSecondKeySeparator)
    );
    if (key !== this.secretKey) throw new Error("Invalid key");
    else return JSON.parse(stringData);
  }

  public isValidToken(token: string): boolean {
    try {
      const buff = Buffer.from(token, "base64");
      const str = buff.toString("utf-8");
      const key = str.slice(0, str.indexOf(this.secretFirstKeySeparator));
      const strSecondSep = str.slice(str.indexOf(this.secretSecondKeySeparator));
      if (key !== this.secretKey) return false;
      else if (strSecondSep !== this.secretSecondKeySeparator) return false;
      else return true;
    } catch (error) {
      return false;
    }
  }
}

export default new K2Token();
