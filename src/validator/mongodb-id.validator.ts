import { ObjectId } from "mongodb";

export const isMongoObjectId = (objectId: string): boolean => ObjectId.isValid(objectId);

export default isMongoObjectId;
