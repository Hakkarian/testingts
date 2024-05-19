import express from "express";
import get from "../../src/controllers/pictures/get";
import add from "../../src/controllers/pictures/add";
import del from "../../src/controllers/pictures/delete";
import { upload } from "../../src/config/cloudinaryConfig";

const router = express.Router();

router.get("/", get.getRiseyPictures);
router.post("/add", upload.single("image"), add.addRiseyPicture);
router.post("/:id/delete", del.deleteRiseyPicture);

export default router;
