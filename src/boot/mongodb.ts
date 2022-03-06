//======================================================================
//
//  ###    ###   #####   ##     ##   ####     #####   ####    #####
//  ## #  # ##  ##   ##  ####   ##  ##       ##   ##  ##  ##  ##  ##
//  ##  ##  ##  ##   ##  ##  ## ##  ##  ###  ##   ##  ##  ##  #####
//  ##      ##  ##   ##  ##    ###  ##   ##  ##   ##  ##  ##  ##  ##
//  ##      ##   #####   ##     ##   ####     #####   ####    #####
//
//======================================================================

import { MongoClient } from "mongodb";

const mongoClient = new MongoClient(process.env.MONGODB_URI!);

mongoClient.connect((err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
});

mongoClient
  .on("connect", () => console.log("MongoDB connected"))
  .on("close", () => console.log("MongoDB connection closed"))
  .on("error", (err) => {
    console.error(err);
    process.exit(1);
  });

export default mongoClient;
