import dotenv from "dotenv";
dotenv.config();
import { v2 as cloudinary } from "cloudinary";
import multer from "multer";

const name = process.env.CLOUD_NAME;
const key = process.env.CLOUD_API_KEY;
const secret = process.env.CLOUD_API_SECRET;

const cloudinaryConfig = {
  cloud_name: name,
  api_key: key,
  api_secret: secret,
};
cloudinary.config(cloudinaryConfig);



export { cloudinary};
