import { IPostgresConfig } from "../../config/config.interface";
import pg from "pg";
import config from "config";

const pgConfig: IPostgresConfig = config.get("database.postgres");

// ─────────────────────────────────────────────────────── POSTGRES MAIN POOL ─────
const pool_main = new pg.Pool({
  user: pgConfig.main.user,
  host: pgConfig.main.host,
  database: pgConfig.main.database,
  password: pgConfig.main.password,
  port: pgConfig.main.port,
});

pool_main
  .on("connect", () => console.log("Main postgres connected"))
  .on("remove", () => console.log("Main postgres connection closed"))
  .on("error", (err) => {
    console.error(err);
    process.exit(1);
  });

// ────────────────────────────────────────────────────── POSTGRES CLOUD POOL ─────
const pool_cloud = new pg.Pool({
  user: pgConfig.cloud.user,
  host: pgConfig.cloud.host,
  database: pgConfig.cloud.database,
  password: pgConfig.cloud.password,
  port: pgConfig.cloud.port,
  ssl: {
    rejectUnauthorized: pgConfig.cloud.ssl.rejectUnauthorized,
    ca: process.env.CACERT,
  },
});

pool_cloud
  .on("connect", () => console.log("Cloud postgres connected"))
  .on("remove", () => console.log("Cloud postgres connection closed"))
  .on("error", (err) => {
    console.error(err);
    process.exit(1);
  });

export default {
  pool_main,
  pool_cloud,
};
