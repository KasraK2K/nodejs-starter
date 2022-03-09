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

export const logger = (text: any, options = { type: "info" }) => {
  const { type } = options;
  const now = new Date();
  const date =
    now.getFullYear() +
    "-" +
    ("0" + (now.getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + now.getDate()).slice(-2);
  const env = process.env.NODE_ENV;

  let path =
    `/var/api/mng-api/logs/` +
    (env == "dev" ? `dev/${date}/` : `prod/${date}/`);
  if (!fs.existsSync(path)) fs.mkdirSync(path);

  let time =
    ("0" + now.getHours()).slice(-2) +
    ":" +
    ("0" + now.getMinutes()).slice(-2) +
    ":" +
    ("0" + now.getSeconds()).slice(-2) +
    ":";

  if (typeof text === "object" || Array.isArray(text)) {
    text = JSON.stringify(text, null, 2);
  }

  text = text
    .replace(/{green}/g, "\u001b[32;1m")
    .replace(/{blue}/g, "\u001b[34;1m")
    .replace(/{yellow}/g, "\u001b[38;5;226m")
    .replace(/{red}/g, "\x1b[31m")
    .replace(/{reset}/g, "\x1b[0m");

  console.log("-" + text);

  if (["info", "error", "debug"].includes(type)) {
    fs.appendFile(
      path + type + ".log",
      `${date} ${time} ${text} \n`,
      function (err) {}
    );
  }

  fs.appendFile(
    path + "all.log",
    `${date} ${time} ${text} \n`,
    function (err) {}
  );
};
