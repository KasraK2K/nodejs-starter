import { IPostgresConfig } from "../../config/config.interface";
import pg from "pg";
import config from "config";

const pgConfig: IPostgresConfig = config.get("database.postgres");

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

export default pool_cloud;
