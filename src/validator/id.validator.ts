import { ObjectId } from "mongodb";
import { validate as uuidValidate } from "uuid";

export const isMongoObjectId = (id: string): boolean => ObjectId.isValid(id);
export const isUUIDv4 = (id: string): boolean => uuidValidate(id);
export const isId = (id: string): boolean => isMongoObjectId(id) || isUUIDv4(id);

export default isMongoObjectId;
