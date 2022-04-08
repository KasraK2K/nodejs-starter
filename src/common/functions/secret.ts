import "../../boot/envirement";

const secretKey = process.env.SECURE_SECRET_KEY ?? "Jsa0lmxkVuTFhJpYXQiOjObFkrNmV4sInRSjFjMlYplzvCCwP3";
const secretFirstKeySeparator =
  process.env.SECURE_SECRET_FIRST_SEPARATOR ?? "NiMjVuTFhObFk0SmxkQzFyWlhrNmV5SjFjMlZ5WDJsa0lqb";
const secretSecondKeySeparator =
  process.env.SECURE_SECRET_SECOND_SEPARATOR ?? "tk6MZRVCI6IkpXVCObFk0SmxVuTFV5SjFjMlZ5WMDM5NjV9";

export const secure = (arg: any): string => {
  const buffSecretKey = Buffer.from(secretKey, "utf-8");
  const strSecretKey = buffSecretKey.toString("base64");

  const buffFirstKeySep = Buffer.from(secretFirstKeySeparator, "utf-8");
  const strFirstKeySep = buffFirstKeySep.toString("base64");

  const bufferArg = Buffer.from(JSON.stringify(arg), "utf-8");
  const strArg = bufferArg.toString("base64");

  const buffSecondKeySep = Buffer.from(secretSecondKeySeparator, "utf-8");
  const strSecondKeySep = buffSecondKeySep.toString("base64");

  return strSecretKey + strFirstKeySep + strArg + strSecondKeySep;
};

export const deSecure = (arg: string): any => {
  const buff = Buffer.from(arg, "base64");
  const str = buff.toString("utf-8");
  const key = str.slice(0, str.indexOf(secretFirstKeySeparator));
  const stringData = str.slice(
    str.indexOf(secretFirstKeySeparator) + secretFirstKeySeparator.length,
    str.indexOf(secretSecondKeySeparator)
  );
  if (key !== secretKey) throw new Error("Invalid key");
  else return JSON.parse(stringData);
};

export const isValidSecure = (arg: string): boolean => {
  try {
    const buff = Buffer.from(arg, "base64");
    const str = buff.toString("utf-8");
    const key = str.slice(0, str.indexOf(secretFirstKeySeparator));
    const strSecondSep = str.slice(str.indexOf(secretSecondKeySeparator));
    if (key !== secretKey) return false;
    else if (strSecondSep !== secretSecondKeySeparator) return false;
    else return true;
  } catch (error) {
    return false;
  }
};

export default { secure, deSecure, isValidSecure };
