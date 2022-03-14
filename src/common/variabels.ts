//==========================================================================
//
//  ##   ##    ###    #####    ##    ###    #####   ##      #####   ####
//  ##   ##   ## ##   ##  ##   ##   ## ##   ##  ##  ##      ##     ##
//  ##   ##  ##   ##  #####    ##  ##   ##  #####   ##      #####   ###
//   ## ##   #######  ##  ##   ##  #######  ##  ##  ##      ##        ##
//    ###    ##   ##  ##   ##  ##  ##   ##  #####   ######  #####  ####
//
//==========================================================================

import config from "config";
import { IConfig } from "../../config/config.interface";
import validator from "../gateway/validator/validator";
import schema from "../gateway/validator/schema";
import { mongoClient, pool } from "../boot";
import { logger } from "./functions/logger";

const configs: IConfig = config.util.toObject();

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
  mongo: {
    mongoClient,
    database: mongoClient.db(configs.database.mongodb.name),
    collection: mongoClient
      .db(configs.database.mongodb.name)
      .collection(configs.database.mongodb.default_collection),
  },
  pool,
  logger,
};

// ──────────────────────────────────────────────────────────────────────────────────────────────────
//   :::::: D E C L E A R   G L O B A L   V A R I A B L E S : :  :   :    :     :        :          :
// ──────────────────────────────────────────────────────────────────────────────────────────────────
declare global {
  const service: typeof globals.service;
  const validator: typeof globals.validator;
  const schema: typeof globals.schema;
  const mongo: {
    mongoClient: typeof globals.mongo.mongoClient;
    database: typeof globals.mongo.database;
    collection: typeof globals.mongo.collection;
  };
  const pool: typeof globals.pool;
  const logger: typeof globals.logger;
  const process_id: string;
}

export default {
  locals,
  globals,
};
