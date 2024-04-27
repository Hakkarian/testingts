import express, { Router } from "express";
import {getPictures, addPicture} from "../controllers/picturesController";
import { upload } from '../config/cloudinaryConfig';

const router = Router();

router.get("/", getPictures);
router.post("/add", upload.single("image"), addPicture);
// router.post("/:id/delete", pictureController.deletePicture);

export default router;
