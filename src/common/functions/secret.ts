const secretKey = process.env.SECURE_SECRET_KEY ?? "NiMjVuTFhObFk0SmxkQzFyWlhrNmV5SjFjMlZ5WDJsa0lqb";
const secretKeySeparator = process.env.SECURE_SECRET_SEPARATOR ?? "Jsa0lmxkVuTFhObFkrNmV4SjFjMl";

export const secure = (arg: any): string => {
  const data = secretKey + secretKeySeparator + JSON.stringify(arg);
  const buff = Buffer.from(data, "utf-8");
  return buff.toString("base64");
};

export const deSecure = (arg: any): any => {
  const buff = Buffer.from(arg, "base64");
  const str = buff.toString("utf-8");
  const key = str.slice(0, str.indexOf(secretKeySeparator));
  const stringData = str.slice(str.indexOf(secretKeySeparator) + secretKeySeparator.length);
  if (key !== secretKey) throw new Error("Invalid key");
  else return JSON.parse(stringData);
};

export default { secure, deSecure };
