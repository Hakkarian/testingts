import { sql } from "@vercel/postgres";
import { Request, Response } from "express";
import { cloudinary } from "../../config/cloudinaryConfig";
import AppError from "../../utils/appError";

const deletePicture = async (req: Request, res: Response) => {
  try {
    const pictureId = parseInt(req.params.id);

    // Retrieve the picture from the database
    const { rows } = await sql`SELECT * FROM pictures WHERE id = ${pictureId}`;

    if (rows.length === 0) {
      throw new AppError(404, "Picture not found");
    }

    const picture = rows[0];

    // Delete the picture from Cloudinary
    await cloudinary.uploader.destroy(picture.cloudinary_id);

    // Delete the picture from the database
    await sql`DELETE FROM pictures WHERE id = ${pictureId}`;

    res.json({ message: "Picture deleted successfully" });
  } catch (error) {
    console.log(error);
    if (error instanceof AppError) {
      res.status(error.status).json({ error: error.message });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
};

export default deletePicture;
