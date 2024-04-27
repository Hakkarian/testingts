import { Pool } from 'pg';

const pool = new Pool({
  user: "postgres",
  host: process.env.POSTGRE_HOST as string,
  database: "postgres",
  password: process.env.POSTGRE_PASSWORD as string,
  port: 5433,
});

export default pool;
