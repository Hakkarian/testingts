import express from "express";
import getPictures from "../../src/controllers/pictures/get";
import addPicture from "../../src/controllers/pictures/add";
import deletePicture from "../../src/controllers/pictures/delete";
import { upload } from "../../src/config/cloudinaryConfig";

const router = express.Router();

router.get("/pictures", getPictures);
router.get("/risey-pictures", getPictures);
router.post("/add", upload.single("image"), addPicture);
router.post("/:id/delete", deletePicture);

export default router;
