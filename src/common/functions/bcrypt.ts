import bcrypt from "bcryptjs";

export const saltGen = async (saltNum?: number) => {
  return await bcrypt.genSalt(
    saltNum ? saltNum : Math.floor(Math.random() * (20 - 10) + 10)
  );
};

export const hashGen = async (text: string, salt?: string) => {
  return await bcrypt.hash(text, salt ? salt : await saltGen());
};

export default { saltGen, hashGen };
