import express from "express";
import cors from "cors";
import morgan from "morgan";
import routes from "./routes";
import { createClient } from "redis";
import connectRedis from "connect-redis";
import session from "express-session";
const RedisStore = connectRedis(session);
const redisClient = createClient({
  host: process.env.REDIS_HOST,
  password: process.env.REDIS_PASSWORD,
  //@ts-ignore
  port: parseInt(process.env.REDIS_PORT),
});
const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(
  session({
    name: "SESSION_ID",
    secret: "sKCx49VgtHZ59bJOTLcU0Gr06ogUnDJi",
    store: new RedisStore({ client: redisClient }),
    resave: false,
    saveUninitialized: false,
    cookie: { httpOnly: false, secure: false, maxAge: 1000 * 60 * 60 * 24 * 7 },
  })
);
app.use(routes);
app.listen(process.env.APP_PORT, () => {
  console.log(`Listening on port ${process.env.APP_PORT}`);
});
