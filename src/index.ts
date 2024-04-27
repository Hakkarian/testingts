import "dotenv/config";
import cors from "cors";
import express, { Request, Response } from "express";
import pictureRouter from './routes/pictureRoute';
import { createPicturesTable } from "./config/postgreConfig";
import pictureController from "./controllers/picturesController";


const app = express();
const port = process.env.PORT!;
app.use(cors());

app.get("/", (req: Request, res: Response) => res.json("Greetings"));

app.get("/api/picture/", pictureController.getPictures);
app.post("/api/picture/add", pictureController.postPicture);
app.post("/api/picture/:id/delete", pictureController.deletePicture);

(async () => {
  await createPicturesTable();

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
})();
export default app;