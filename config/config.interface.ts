// ────────────────────────────────────────────────────────────── ALL CONFIGS ─────
export interface IConfig {
  mode: string;
  application: IApplicationConfig;
  database: IDatabaseConfig;
  cors: ICorsConfig;
}

// ────────────────────────────────────────────────────────────── APPLICATION ─────
export interface IApplicationConfig {
  print_info: boolean;
  api_version: string;
  front_version: string;
  logPath: string;
}

// ──────────────────────────────────────────────────────────────── DATABASES ─────
export interface IDatabaseConfig {
  mongodb: IMongodbConfig;
  postgres: IPostgresConfig;
}

// ─── MONGODB ────────────────────────────────────────────────────────────────────
export interface IMongodbConfig {
  name: string;
  default_collection: string;
  uri: string;
}

// ─── POSTGRESQL ─────────────────────────────────────────────────────────────────
export interface IPostgresConfig {
  main: {
    user: string;
    host: string;
    database: string;
    password: string;
    port: number;
    idleTimeoutMillis: number;
    connectionTimeoutMillis: number;
  };
  cloud: {
    user: string;
    host: string;
    database: string;
    password: string;
    port: number;
    idleTimeoutMillis: number;
    connectionTimeoutMillis: number;
    ssl: {
      rejectUnauthorized: boolean;
    };
  };
}

// ───────────────────────────────────────────────────────────────────── CORS ─────
export interface ICorsConfig {
  allow_origin: string;
  allow_methods: string;
}

// ───────────────────────────────────────────────────────────── RATE LIMITER ─────
export interface IRateLimiter {
  windowMs: number;
  max: number;
  standardHeaders: boolean;
  legacyHeaders: boolean;
}
