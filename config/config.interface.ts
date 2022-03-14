export interface IConfig {
  mode: string;
  application: IApplicationConfig;
  database: IDatabaseConfig;
  cors: ICorsConfig;
}

export interface IApplicationConfig {
  print_info: boolean;
  api_version: string;
  front_version: string;
  logPath: string;
  is_on_server: boolean;
}

export interface IDatabaseConfig {
  mongodb: IMongodbConfig;
}

export interface IMongodbConfig {
  name: string;
  default_collection: string;
  uri: string;
}

export interface ICorsConfig {
  allow_origin: string;
  allow_methods: string;
}

export interface IRateLimiter {
  windowMs: number;
  max: number;
  standardHeaders: boolean;
  legacyHeaders: boolean;
}
