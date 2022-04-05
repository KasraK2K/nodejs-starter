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
import _ from "lodash";
import express, { Express } from "express";
import pg from "pg";
import { MongoClient } from "mongodb";
import admin from "firebase-admin";

const app: Express = express();

interface IExportModule {
  express: typeof express;
  app: Express;
  firebase: admin.app.App;
  pool: pg.Pool;
  mongoClient: MongoClient;
}

const exportModule = _.assign({}, {
  app,
  express,
} as IExportModule);

starterConfig.boot.forEach(async (moduleName) => {
  await import(`./${moduleName}`).catch((err) => console.log(err.message));

  // ─── ADD POSTGRESQL TO EXPORTMODULE ─────────────────────────────────────────────
  if (moduleName === "postgresql") exportModule.pool = (await import("./postgresql")).default;

  // ─── ADD MONGODB TO EXPORTMODULE ───────────────────────────────────────────────
  if (moduleName === "mongodb") {
    exportModule.mongoClient = (await import("./mongodb")).default;
    exportModule.mongoClient.connect((err) => {
      if (err) {
        console.error(err);
        process.exit(1);
      }
    });
  }

  // ─── ADD FIREBASE TO EXPORTMODULE ───────────────────────────────────────────────
  if (moduleName === "firebase") exportModule.firebase = (await import("./firebase")).default;
});

export default exportModule;
