//==============================================================================================
//
//   ####    ##       #####   #####     ###    ##            ######  ##    ##  #####   #####
//  ##       ##      ##   ##  ##  ##   ## ##   ##              ##     ##  ##   ##  ##  ##
//  ##  ###  ##      ##   ##  #####   ##   ##  ##              ##      ####    #####   #####
//  ##   ##  ##      ##   ##  ##  ##  #######  ##              ##       ##     ##      ##
//   ####    ######   #####   #####   ##   ##  ######          ##       ##     ##      #####
//
//==============================================================================================

import { globals } from "../common/variabels";

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
