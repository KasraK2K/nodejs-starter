import mongoose from "mongoose";

export const isMongoObjectId = (objectId: string): boolean => mongoose.Types.ObjectId.isValid(objectId);

export default isMongoObjectId;
