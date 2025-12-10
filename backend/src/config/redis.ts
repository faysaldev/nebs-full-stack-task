import Redis from "ioredis";
import { REDIS_DB, REDIS_HOST, REDIS_PASSWORD, REDIS_PORT } from "./ENV";
const redis = new Redis({
  host: REDIS_HOST, // Redis host (e.g., "localhost")
  port: Number(REDIS_PORT), // Convert the port to a number
  password: REDIS_PASSWORD, // Use default empty string if no password
  db: Number(REDIS_DB), // Convert db to a number (default is 0)
});

export default redis;
