import express from "express";
import get from "../../src/controllers/pictures/get";
import add from "../../src/controllers/pictures/add";
import del from "../../src/controllers/pictures/delete";
import { upload } from "../../src/config/cloudinaryConfig";

const router = express.Router();

router.get("/", get.getPictures);
router.post("/add", upload.single("image"), add.addPicture);
router.post("/:id/delete", del.deletePicture);

export default router;
