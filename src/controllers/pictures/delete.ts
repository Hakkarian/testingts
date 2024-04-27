import pool from "../../config/postgreConfig";
import { Request, Response } from "express";
import { cloudinary } from "../../config/cloudinaryConfig";
import AppError from "../../utils/appError";

const deletePicture = async (req: Request, res: Response) => {
  try {
    const pictureId = parseInt(req.params.id);

    // Retrieve the picture from the database
    const query = {
      name: "get-picture",
      text: "SELECT * FROM pictures WHERE id = $1",
      values: [pictureId],
    };
    const { rows } = await pool.query(query);

    if (rows.length === 0) {
      throw new AppError(404, "Picture not found");
    }

    const picture = rows[0];

    // Delete the picture from Cloudinary
    await cloudinary.uploader.destroy(picture.cloudinary_id);

    // Delete the picture from the database
    const deleteQuery = {
      name: "delete-picture",
      text: "DELETE FROM pictures WHERE id = $1",
      values: [pictureId],
    };
    await pool.query(deleteQuery);

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
