import { IPostgresConfig } from "../../config/config.interface";
import pg from "pg";
import config from "config";

const pgConfig: IPostgresConfig = config.get("database.postgres");

const pool = new pg.Pool({
  user: pgConfig.user,
  host: pgConfig.host,
  database: pgConfig.database,
  password: pgConfig.password,
  port: pgConfig.port,
});

pool
  .on("connect", () => console.log("Postgres connected"))
  .on("remove", () => console.log("Postgres connection closed"))
  .on("error", (err) => {
    console.error(err);
    process.exit(1);
  });

export default pool;
