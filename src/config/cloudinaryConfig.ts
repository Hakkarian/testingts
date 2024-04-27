import { v2 as cloudinary } from "cloudinary";
import multer from 'multer';

const cloudinaryConfig = {
  cloud_name: process.env.CLOUD_NAME as string,
  api_key: process.env.CLOUD_API_KEY as string,
  api_secret: process.env.CLOUD_API_SECRET as string,
  secure: true,
};
cloudinary.config(cloudinaryConfig);


const upload = multer({dest: 'uploads/'})

export {cloudinary, upload}
