export const generateToken = (
  payload: Record<string, any>,
  configs: {
    secret?: string;
    phrase_one?: string;
    phrase_two?: string;
  } = {}
): string => {
  const {
    secret = "Jsa0lmxkVuTFhJpYXQiOjObFkrNmV4sInRSjFjMlYplzvCCwP3",
    phrase_one = "NiMjVuTFhObFk0SmxkQzFyWlhrNmV5SjFjMlZ5WDJsa0lqb",
    phrase_two = "tk6MZRVCI6IkpXVCObFk0SmxVuTFV5SjFjMlZ5WMDM5NjV9",
  } = configs;
  payload.__random__fake__key__ = (+new Date() + Math.floor(Math.random() * (999 - 100) + 100)).toString(16);

  const str = secret + phrase_one + `${JSON.stringify(payload)}` + phrase_two;
  const buffer = Buffer.from(str, "utf-8");
  return buffer.toString("base64");
};

export const verifyToken = (
  token: string,
  configs: {
    secret?: string;
    phrase_one?: string;
    phrase_two?: string;
  } = {}
): any => {
  const {
    secret = "Jsa0lmxkVuTFhJpYXQiOjObFkrNmV4sInRSjFjMlYplzvCCwP3",
    phrase_one = "NiMjVuTFhObFk0SmxkQzFyWlhrNmV5SjFjMlZ5WDJsa0lqb",
    phrase_two = "tk6MZRVCI6IkpXVCObFk0SmxVuTFV5SjFjMlZ5WMDM5NjV9",
  } = configs;

  const buff = Buffer.from(token, "base64");
  const str = buff.toString("utf-8");
  const key = str.slice(0, str.indexOf(phrase_one));
  const stringData = str.slice(str.indexOf(phrase_one) + phrase_one.length, str.indexOf(phrase_two));
  if (key !== secret) throw new Error("Invalid key");
  else {
    const payload = JSON.parse(stringData);
    delete payload.__random__fake__key__;
    return payload;
  }
};

export const isValidToken = (
  token: string,
  configs: {
    secret?: string;
    phrase_one?: string;
    phrase_two?: string;
  } = {}
): boolean => {
  const {
    secret = "Jsa0lmxkVuTFhJpYXQiOjObFkrNmV4sInRSjFjMlYplzvCCwP3",
    phrase_one = "NiMjVuTFhObFk0SmxkQzFyWlhrNmV5SjFjMlZ5WDJsa0lqb",
    phrase_two = "tk6MZRVCI6IkpXVCObFk0SmxVuTFV5SjFjMlZ5WMDM5NjV9",
  } = configs;

  try {
    // const secretBuff = Buffer.from(secret, "utf-8");
    // const secret64 = secretBuff.toString("base64");

    // const phraseOneBuff = Buffer.from(phrase_one, "utf-8");
    // const phraseOne64 = phraseOneBuff.toString("base64");

    const buff = Buffer.from(token, "base64");
    const str = buff.toString("utf-8");
    const key = str.slice(0, str.indexOf(phrase_one));
    const strSecondSep = str.slice(str.indexOf(phrase_two));
    if (key !== secret) return false;
    else if (strSecondSep !== phrase_two) return false;
    else return true;
  } catch (error) {
    return false;
  }
};

export default { generateToken, verifyToken, isValidToken };
