import express, { Router } from "express";
import pictureController from "../controllers/picturesController";
import { upload } from '../config/cloudinaryConfig';

const router = Router();

router.get("/", pictureController.getPictures);
router.post("/add", upload.single("image"), pictureController.postPicture)
router.post("/:id/delete", pictureController.deletePicture);

export default router;
