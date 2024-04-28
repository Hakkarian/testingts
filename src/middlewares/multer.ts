import multer from "multer";
import DatauriParser from "datauri/parser";
import path from "path";

const storage = multer.memoryStorage();

const multerUploads = multer({ storage }).single("image");

const dUri = new DatauriParser();

interface Image {
    
  fieldname: string,
  originalname: string,
  encoding: string,
  mimetype: string,
  buffer: Buffer,
  size: number

}

/**
 * @description This function converts the buffer to data url
 * @param {Object} req containing the field object
 * @returns {String} The data url from the string buffer
 */
export const dataUri = (img: Image) => dUri.format(path.extname(img.originalname).toString(), img.buffer);

export default multerUploads;
