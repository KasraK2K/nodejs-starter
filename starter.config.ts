//=========================================================================================================================
//
//   ####  ######    ###    #####    ######  #####  #####           ####   #####   ##     ##  #####  ##   ####     ####
//  ##       ##     ## ##   ##  ##     ##    ##     ##  ##         ##     ##   ##  ####   ##  ##     ##  ##       ##
//   ###     ##    ##   ##  #####      ##    #####  #####          ##     ##   ##  ##  ## ##  #####  ##  ##  ###   ###
//     ##    ##    #######  ##  ##     ##    ##     ##  ##         ##     ##   ##  ##    ###  ##     ##  ##   ##     ##
//  ####     ##    ##   ##  ##   ##    ##    #####  ##   ##         ####   #####   ##     ##  ##     ##   ####    ####
//
//=========================================================================================================================

import fs from "fs";
import path from "path";

export default {
  boot: [
    "envirement",
    "cron-jobs",
    // "mongodb",
    /*"mongoose",*/
    "postgresql",
    "firebase",
    "information",
    "treblle",
  ],
  swagger: {
    enabled: true,
    endpoint: "/swagger",
    options: {
      explorer: true,
      swaggerOptions: { validatorUrl: null },
      customCss: fs.readFileSync(path.resolve(process.cwd(), "src/swagger/css/feeling-blue.css"), "utf8"),
    },
  },
  redis: {
    enabled: true,
    options: {
      url: process.env.REDIS_URL ?? "redis://0.0.0.0:6379",
      // socket: "",
      // username: "",
      // password: "",
      // name: "node_starter_redis",
      // database: 0,
    },
  },
};
