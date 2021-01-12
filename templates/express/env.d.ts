declare namespace NodeJS {
  export interface ProcessEnv {
    REDIS_HOST: string;
    REDIS_PASSWORD: string;
    REDIS_PORT: string;
    APP_PORT: string;
  }
}
