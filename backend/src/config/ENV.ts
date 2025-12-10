import dotenv from "dotenv";
dotenv.config();
export const BACKEND_IP: string = process.env.BACKEND_IP as string;
export const PORT: number = parseInt(process.env.PORT as string, 10);
export const DATABASE_URL: string = process.env.DATABASE_URL as string;
export const REDIS_HOST: string | undefined = process.env.REDIS_HOST;
export const REDIS_PORT: string | undefined = process.env.REDIS_PORT;
export const REDIS_PASSWORD: string | undefined = process.env.REDIS_PASSWORD;
export const REDIS_DB: string | undefined = process.env.REDIS_DB;
