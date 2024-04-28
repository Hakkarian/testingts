import dotenv from 'dotenv';
dotenv.config();
import { sql } from '@vercel/postgres';


export const createPicturesTable = async () => {
  try {
    const result = await sql`
      SELECT to_regclass('pictures') as exists
    `;

    if (result.rows[0].exists) {
      return;
    }
    await sql`
      CREATE TABLE IF NOT EXISTS pictures (
        id SERIAL PRIMARY KEY,
        cloudinary_id VARCHAR(255) NOT NULL,
        cloudinary_url VARCHAR(255) NOT NULL
      );
    `;
    console.log('Table "pictures" created or already exists');
  } catch (error) {
    console.error('Error creating table "pictures":', error);
  }
}
