import express from "express";
import getPictures from "../../src/controllers/pictures/get";
import { upload } from '../config/cloudinaryConfig';
import addPicture from "../../src/controllers/pictures/add";
import deletePicture from "../../src/controllers/pictures/delete";

const router = express.Router();

router.get("/", getPictures);
router.post("/add", upload.single("image"), addPicture);
router.post("/:id/delete", deletePicture);

export default router;
