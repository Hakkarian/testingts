import dotenv from 'dotenv';
dotenv.config();
import { Pool } from 'pg';

const postgreSQL = process.env.POSTGRES_URL;

const pool = new Pool({
  connectionString: postgreSQL
});

export const createPicturesTable = async () => {
  try {
    const result = await pool.query(`
      SELECT to_regclass('pictures') as exists
    `);

    if (result.rows[0].exists) {
      return;
    }
    await pool.query(`
      CREATE TABLE IF NOT EXISTS pictures (
        id SERIAL PRIMARY KEY,
        cloudinary_id VARCHAR(255) NOT NULL,
        cloudinary_url VARCHAR(255) NOT NULL
      );
    `);
    console.log('Table "pictures" created or already exists');
  } catch (error) {
    console.error('Error creating table "pictures":', error);
  }
}

export default pool;
