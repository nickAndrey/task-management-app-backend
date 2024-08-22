import { configDotenv } from 'dotenv';
import { Pool, PoolConfig } from 'pg';

configDotenv();

const dbConfig: PoolConfig = {
  password: process.env.POSTGRES_PASSWORD,
  user: process.env.POSTGRES_USER,
  host: process.env.POSTGRES_HOST,
  database: process.env.POSTGRES_DB,
  port: Number(process.env.POSTGRES_PORT),
};

const db = new Pool(dbConfig);

export default db;
