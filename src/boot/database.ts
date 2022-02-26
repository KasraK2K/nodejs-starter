import mongoose from "mongoose";

export const mongoConnection = mongoose.createConnection(
  process.env.MONGODB_URI!
);
