import "../../boot/envirement";

class K2Token {
  constructor(
    private secretKey = process.env.SECURE_SECRET_KEY ?? "Jsa0lmxkVuTFhJpYXQiOjObFkrNmV4sInRSjFjMlYplzvCCwP3",
    private secretFirstKeySeparator = process.env.SECURE_SECRET_FIRST_SEPARATOR ??
      "NiMjVuTFhObFk0SmxkQzFyWlhrNmV5SjFjMlZ5WDJsa0lqb",
    private secretSecondKeySeparator = process.env.SECURE_SECRET_SECOND_SEPARATOR ??
      "tk6MZRVCI6IkpXVCObFk0SmxVuTFV5SjFjMlZ5WMDM5NjV9"
  ) {}

  public generateToken(payload: Record<string, any>): string {
    payload.__random__fake__key__ = (+new Date() + Math.floor(Math.random() * (999 - 100) + 100)).toString(16);

    const str =
      this.secretKey + this.secretFirstKeySeparator + `${JSON.stringify(payload)}` + this.secretSecondKeySeparator;
    const buffer = Buffer.from(str, "utf-8");
    return buffer.toString("base64");
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
    else {
      const payload = JSON.parse(stringData);
      delete payload.__random__fake__key__;
      return payload;
    }
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
