import pool from "../../config/postgreConfig";
import { Request, Response } from "express";

const getPictures = async (req: Request, res: Response) => {
  const { page = 1, page_size = 4 }: { page?: number; page_size?: number } =
    req.query;
  const offset = (page - 1) * page_size;

  try {
    const query = `SELECT * FROM pictures ORDER BY id LIMIT $1 OFFSET $2`;
    const values = [page_size, offset];
    const { rows } = await pool.query(query, values);

    if (rows.length === 0) {
      return res
        .status(404)
        .json({ error: "No pictures found for the given page" });
    }

    const pictures = rows.map(({ id, cloudinary_id, cloudinary_url }) => ({
      id: id as number,
      cloudinary_id: cloudinary_id as string,
      cloudinary_url: cloudinary_url as string,
    }));
    res.json(pictures);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default getPictures;
