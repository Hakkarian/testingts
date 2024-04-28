import pool from "../../config/postgreConfig";
import { Request, Response } from "express";
import { cloudinary } from "../../config/cloudinaryConfig";
import AppError from "../../utils/appError";

interface MulterRequest extends Request {
  file: any;
}

const addPicture = async (req: Request, res: Response) => {
  try {
    const image = (req as MulterRequest).file;
    if (!image) {
      throw new AppError(404, "Image file not found");
    }

    const imagePath = image.path;
    const pathArr = imagePath.split("/");
    const length = pathArr.length;
    const lastElement = pathArr[length - 1];

    // Upload the image to Cloudinary
    const result = await cloudinary.uploader.upload(lastElement);

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
    });
  } catch (error) {
    console.log(error);
  }
};

export default addPicture;
