import express, { Router, Request, Response } from "express";
import pictureController from "../controllers/picturesController";
import { upload } from '../config/cloudinaryConfig';

const router = Router();

router.get("/", pictureController.getPictures);
router.post("/add", (req: Request, res: Response) => res.json("This is fine"));
router.post("/:id/delete", pictureController.deletePicture);

export default router;
