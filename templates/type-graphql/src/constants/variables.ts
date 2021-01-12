import Redis from "ioredis";
export const RedisClient = new Redis({
  host: process.env.REDIS_HOST,
  password: process.env.REDIS_PASSWORD,
  //@ts-ignore
  port: parseInt(process.env.REDIS_PORT),
});
