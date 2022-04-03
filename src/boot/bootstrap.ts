//===============================================================================
//
//  #####    #####    #####   ######   ####  ######  #####      ###    #####
//  ##  ##  ##   ##  ##   ##    ##    ##       ##    ##  ##    ## ##   ##  ##
//  #####   ##   ##  ##   ##    ##     ###     ##    #####    ##   ##  #####
//  ##  ##  ##   ##  ##   ##    ##       ##    ##    ##  ##   #######  ##
//  #####    #####    #####     ##    ####     ##    ##   ##  ##   ##  ##
//
//===============================================================================

// ──────────────────────────────────────────────────────────────────────────────────
//   :::::: R E F L E C T   M E T A D A T A : :  :   :    :     :        :          :
// ──────────────────────────────────────────────────────────────────────────────────
import "reflect-metadata";
import starterConfig from "../../starter.config";
import express, { Express } from "express";

const app: Express = express();

starterConfig.boot.forEach(async (module) => {
  await import(`./${module}`).catch((err) => console.log(err));

  if (module === "mongodb")
    mongo.mongoClient.connect((err) => {
      if (err) {
        console.error(err);
        process.exit(1);
      }
    });
});

export { express, app };
