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
import "./extend";
import "./envirement";
import starterConfig from "../../starter.config";
import express, { Express } from "express";
import mongoClient from "./mongodb";
import pool from "./postgresql";
import fs from "fs";
import { createRedisClient } from "./redis";

const app: Express = express();

starterConfig.boot.forEach(async (moduleName) => {
  fs.existsSync(`./${moduleName}`) &&
    (await import(`./${moduleName}`).then(() => console.log(moduleName)).catch((err) => console.log(err.message)));

  // ─── MONGODB ────────────────────────────────────────────────────────────────────
  moduleName === "mongodb" &&
    mongoClient.connect((err) => {
      if (err) {
        console.error(err);
        process.exit(1);
      }
    });
});

export { app, express, mongoClient, pool, createRedisClient };
