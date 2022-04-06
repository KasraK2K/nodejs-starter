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
import mongoClient from "./mongodb";
import pool from "./postgresql";
import firebase from "./firebase";

const app: Express = express();

starterConfig.boot.forEach(async (moduleName) => {
  await import(`./${moduleName}`).catch((err) => console.log(err.message));

  // ─── MONGODB ────────────────────────────────────────────────────────────────────
  if (moduleName === "mongodb") {
    mongoClient.connect((err) => {
      if (err) {
        console.error(err);
        process.exit(1);
      }
    });
  }
});

export { app, express, mongoClient, pool, firebase };
