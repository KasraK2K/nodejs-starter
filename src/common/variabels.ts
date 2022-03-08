//==========================================================================
//
//  ##   ##    ###    #####    ##    ###    #####   ##      #####   ####
//  ##   ##   ## ##   ##  ##   ##   ## ##   ##  ##  ##      ##     ##
//  ##   ##  ##   ##  #####    ##  ##   ##  #####   ##      #####   ###
//   ## ##   #######  ##  ##   ##  #######  ##  ##  ##      ##        ##
//    ###    ##   ##  ##   ##  ##  ##   ##  #####   ######  #####  ####
//
//==========================================================================

import validator from "../gateway/validator/validator";
import schema from "../gateway/validator/schema";
import { infoGen } from "./functions/information";
// import { mongoClient } from "../boot";

// ────────────────────────────────────────────────────────────────────────────────
//   :::::: L O C A L   V A R I A B L E S : :  :   :    :     :        :          :
// ────────────────────────────────────────────────────────────────────────────────
export const locals = {
  application: {
    name: "Hackaton Starter",
  },
};

// ──────────────────────────────────────────────────────────────────────────────────
//   :::::: G L O B A L   V A R I A B L E S : :  :   :    :     :        :          :
// ──────────────────────────────────────────────────────────────────────────────────
export const globals = {
  service: {
    name: "Global Service Name",
    version: "0.0.1",
  },
  validator,
  schema,
  infoGen,
  // mongo: {
  //   mongoClient,
  //   database: mongoClient.db(process.env.MONGODB_DATABSE_NAME),
  //   collection: mongoClient
  //     .db(process.env.MONGODB_DATABSE_NAME)
  //     .collection(process.env.MONGODB_DEFAULT_COLLECTION!),
  // },
};

// ──────────────────────────────────────────────────────────────────────────────────────────────────
//   :::::: D E C L E A R   G L O B A L   V A R I A B L E S : :  :   :    :     :        :          :
// ──────────────────────────────────────────────────────────────────────────────────────────────────
declare global {
  const service: typeof globals.service;
  const validator: typeof globals.validator;
  const schema: typeof globals.schema;
  const infoGen: typeof globals.infoGen;
  // const mongo: {
  //   mongoClient: typeof globals.mongo.mongoClient;
  //   database: typeof globals.mongo.database;
  //   collection: typeof globals.mongo.collection;
  // };
}

export default {
  locals,
  globals,
};
