import pool from "../config/postgreConfig";
import express, { Request, Response } from "express";
import { cloudinary } from "../config/cloudinaryConfig";
import AppError from "../utils/appError";

interface MulterRequest extends Request {
  file: any
}

const pictureController = {
  getPictures: async (req: Request, res: Response) => {
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
  },
  postPicture: async (req: Request, res: Response) => {
    try {
      const image = (req as MulterRequest).file;
      if (!image) {
        throw new AppError(404, "Image file not found");
      }

      const imagePath = image.path;
      const pathArr = imagePath.split("/");
      const length = pathArr.length;

      // Upload the image to Cloudinary
      const result = await cloudinary.uploader.upload(pathArr[length - 1]);

      // Insert the picture into the database
      const query = {
        name: "insert-picture",
        text: "INSERT INTO pictures (cloudinary_url, cloudinary_id) VALUES ($1, $2)",
        values: [result.url, result.public_id],
      };

      await pool.query(query);

      // Send a JSON response with the successful upload information
      res.json({
        message: "Picture uploaded successfully",
        url: result.url,
        public_id: result.public_id,
      });
    } catch (error) {
      console.log(error);
    }
  },
  deletePicture: async (req: Request, res: Response) => {
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
}
};

export default pictureController;