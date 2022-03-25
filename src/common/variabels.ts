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
import validator from "../validator/validator";
import schema from "../validator/schema";
import { mongoClient, pool } from "../boot";
import { logger } from "./functions/logger";
import { objectValidator } from "../validator/objectValidator";
import objectSchema from "../validator/objectSchema";

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
  objectValidator,
  objectSchema,
  mongo: {
    mongoClient,
    database: (databaseName?: string) => mongoClient.db(databaseName ?? configs.database.mongodb.name),
    collection: (collectionName?: string) =>
      mongoClient
        .db(configs.database.mongodb.name)
        .collection(collectionName ?? configs.database.mongodb.default_collection),
  },
  pg: { pool },
  logger,
};

// ──────────────────────────────────────────────────────────────────────────────────────────────────
//   :::::: D E C L E A R   G L O B A L   V A R I A B L E S : :  :   :    :     :        :          :
// ──────────────────────────────────────────────────────────────────────────────────────────────────
declare global {
  const service: typeof globals.service;
  const validator: typeof globals.validator;
  const schema: typeof globals.schema;
  const objectValidator: typeof globals.objectValidator;
  const objectSchema: typeof globals.objectSchema;
  const mongo: {
    mongoClient: typeof globals.mongo.mongoClient;
    database: typeof globals.mongo.database;
    collection: typeof globals.mongo.collection;
  };
  const pg: {
    pool: typeof globals.pg.pool;
  };
  const logger: typeof globals.logger;
  const process_id: string;
}

export default {
  locals,
  globals,
};
