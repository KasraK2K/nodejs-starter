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
import { postgresSchema, mongoSchema } from "../validator/schema";
import boot from "../boot";
import { logger } from "./functions/logger";
import { objectValidator } from "../validator/objectValidator";
import objectSchema from "../validator/objectSchema";

const { mongoClient, pool } = boot;
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
  schema: {
    pg: postgresSchema,
    mongo: mongoSchema,
  },
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

export default {
  locals,
  globals,
};
