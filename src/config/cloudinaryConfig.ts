import dotenv from "dotenv";
dotenv.config();
import { v2 as cloudinary } from "cloudinary";
import multer from "multer";

const name = process.env.CLOUD_NAME;
const key = process.env.CLOUD_API_KEY;
const secret = process.env.CLOUD_API_SECRET;

const cloudinaryConfig = {
  cloud_name: name as string,
  api_key: key as string,
  api_secret: secret as string,
};
cloudinary.config(cloudinaryConfig);

const upload = multer({ dest: "uploads/" });

export { cloudinary, upload };
