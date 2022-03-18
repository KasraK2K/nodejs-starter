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
import validator from "../http/validator/validator";
import schema from "../http/validator/schema";
import { mongoClient, postgresPool } from "../boot";
import { logger } from "./functions/logger";
import { objectValidator } from "../http/validator/objectValidator";
import objectSchema from "../http/validator/objectSchema";

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
    database: mongoClient.db(configs.database.mongodb.name),
    collection: mongoClient.db(configs.database.mongodb.name).collection(configs.database.mongodb.default_collection),
  },
  pg: { ...postgresPool },
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
    pool_main: typeof globals.pg.pool_main;
    pool_cloud: typeof globals.pg.pool_cloud;
  };
  const logger: typeof globals.logger;
  const process_id: string;
}

export default {
  locals,
  globals,
};
