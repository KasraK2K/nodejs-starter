import Application from "./Application";
import { LoggerEnum } from "./common/enums/logger.enum";
import process from "process";
import secret from "./common/functions/secret";

const str = secret.secure({ user_id: 123 });
console.log(str);
const obj = secret.deSecure(str);
console.log(obj);

// ─── UNHANDLED REJECTION ────────────────────────────────────────────────────────
process.on("unhandledRejection", (reason, p) => {
  logger(`{red}Unhandled Rejection error{reset}`, LoggerEnum.INFO);
  logger(`{red}Unhandled Rejection at: Promise ${p} Reson: ${reason}{reset}`, LoggerEnum.ERROR);
});

// ─── UNCAUGHT EXCEPTION ─────────────────────────────────────────────────────────
process.on("uncaughtException", (err) => {
  logger(`{red}Uncaught Exception error{reset}`, LoggerEnum.INFO);
  logger(`{red}${err.message}{reset}`, LoggerEnum.ERROR);
  logger(`{red}${err.stack}{reset}`, LoggerEnum.ERROR);
  process.exit(1);
});

// ─── START SERVER ───────────────────────────────────────────────────────────────
const server = new Application({ port: 6000 });
server.start();
