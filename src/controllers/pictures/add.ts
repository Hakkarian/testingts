import { sql } from "@vercel/postgres";
import { Request, Response } from "express";
import { cloudinary } from "../../config/cloudinaryConfig";
import AppError from "../../utils/appError";
import { dataUri } from "../../middlewares/multer";

interface MulterRequest extends Request {
  file: any;
}

const addPicture = async (req: Request, res: Response) => {
  try {
    const image = (req as MulterRequest).file;
    console.log(image)
    if (!image) {
      throw new AppError(404, "Image file not found");
    }

    const fileContent = dataUri(image).content;
    // Upload the image to Cloudinary
    const result = await cloudinary.uploader.upload(fileContent);

    await sql`INSERT INTO pictures (cloudinary_url, cloudinary_id) VALUES (${result.url}, ${result.public_id})`;

    // Send a JSON response with the successful upload information
    res.json({
      message: "Picture uploaded successfully",
    });
  } catch (error) {
    console.log(error);
  }
};

export default addPicture;
