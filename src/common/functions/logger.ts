//=======================================================
//
//  ##       #####    ####     ####    #####  #####
//  ##      ##   ##  ##       ##       ##     ##  ##
//  ##      ##   ##  ##  ###  ##  ###  #####  #####
//  ##      ##   ##  ##   ##  ##   ##  ##     ##  ##
//  ######   #####    ####     ####    #####  ##   ##
//
//=======================================================

// NOTE: Example: logger("{red}Hello World{reset}", { type: "error" });

import fs from "fs";
import { LoggerEnum } from "../enums/logger.enum";
import config from "config";
import { IApplicationConfig } from "../../../config/config.interface";

const applicationConfig: IApplicationConfig = config.get("application");

export const logger = (text: any, type = LoggerEnum.INFO) => {
  const isServer: boolean = JSON.parse(process.env.IS_ON_SERVER || "false");
  const now = new Date();
  const date =
    now.getFullYear() +
    "-" +
    ("0" + (now.getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + now.getDate()).slice(-2);

  let path = `${applicationConfig.logPath}${date}/`;

  isServer && !fs.existsSync(path) && fs.mkdirSync(path);

  let time =
    ("0" + now.getHours()).slice(-2) +
    ":" +
    ("0" + now.getMinutes()).slice(-2) +
    ":" +
    ("0" + now.getSeconds()).slice(-2) +
    " " +
    process_id;

  if (typeof text === "object" || Array.isArray(text)) {
    text = JSON.stringify(text, null, 2);
  }

  text = text
    .replace(/{green}/g, "\u001b[32;1m")
    .replace(/{blue}/g, "\u001b[34;1m")
    .replace(/{yellow}/g, "\u001b[38;5;226m")
    .replace(/{red}/g, "\x1b[31m")
    .replace(/{reset}/g, "\x1b[0m");

  if (isServer) {
    console.log("-" + text);

    fs.appendFile(
      path + type + ".log",
      `${date} ${time} ${text} \n`,
      function (err) {}
    );

    ![LoggerEnum.REQUEST].includes(type) &&
      fs.appendFile(
        path + "all.log",
        `${date} ${time} ${text} \n`,
        function (err) {}
      );
  }
};
