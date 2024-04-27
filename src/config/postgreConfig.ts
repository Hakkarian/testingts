import 'dotenv/config'
import { Pool } from 'pg';

const postgreSQL = process.env.POSTGRES_URL

const pool = new Pool({
  connectionString: postgreSQL
});

export default pool;
