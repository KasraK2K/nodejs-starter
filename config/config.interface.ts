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
  portal_version: string;
  logger: {
    logFilePath: string;
    logOnFile: boolean;
    logOnConsole: boolean;
    logOnDatabase: boolean;
  };
  upload: {
    destination: string;
  };
  monitoring: IMonitoringConfig;
}

export interface IMonitoringConfig {
  monitoring: {
    treblle: ITreblleConfig;
  };
}

export interface ITreblleConfig {
  apiKey: string;
  projectId: string;
}

// ──────────────────────────────────────────────────────────────── DATABASES ─────
export interface IDatabaseConfig {
  mongodb: IMongodbConfig;
  postgres: IPostgresConfig;
  redis: IRedisConfig;
}

// ─── MONGODB ────────────────────────────────────────────────────────────────────
export interface IMongodbConfig {
  name: string;
  default_collection: string;
  uri: string;
}

// ─── POSTGRESQL ─────────────────────────────────────────────────────────────────
export interface IPostgresConfig {
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
}

// ─── REDIS ──────────────────────────────────────────────────────────────────────
export interface IRedisConfig {
  uri: string;
}

// ───────────────────────────────────────────────────────────────────── CORS ─────
export interface ICorsConfig {
  allow_origin: string;
  allow_method: string;
}

// ───────────────────────────────────────────────────────────── RATE LIMITER ─────
export interface IRateLimiter {
  windowMs: number;
  max: number;
  standardHeaders: boolean;
  legacyHeaders: boolean;
}
