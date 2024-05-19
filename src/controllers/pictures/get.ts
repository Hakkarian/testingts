import { sql } from "@vercel/postgres";
import { Request, Response } from "express";

const getPictures = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const perPage = parseInt(req.query.per_page as string) || 4;
  const offset = (page - 1) * perPage;
  const keyword = `${req.originalUrl.split("/")[2].split("?")[0]}`;

  try {
    // Query to get the subset of pictures with LIMIT and OFFSET
    const { rows } = await sql`
      SELECT * FROM pictures
      ORDER BY id
      LIMIT ${perPage} OFFSET ${offset}
    `;
    
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

    const totalCount = (await sql`SELECT COUNT(*) FROM pictures`).rows[0].count;

    res.json({
      pictures, totalCount, keyword
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getRiseyPictures = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const perPage = parseInt(req.query.per_page as string) || 4;
  const offset = (page - 1) * perPage;
  const keyword = `${req.originalUrl.split("/")[2].split("?")[0]}`;

  try {
    // Query to get the subset of pictures with LIMIT and OFFSET
    const { rows } = await sql`
      SELECT * FROM riseypictures
    `;

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

    // const totalCount = (await sql`SELECT COUNT(*) FROM riseypictures`).rows[0].count;

    res.json({
      pictures,
      keyword,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default {getPictures, getRiseyPictures};
