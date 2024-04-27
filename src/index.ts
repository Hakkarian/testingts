import "dotenv/config";
import cors from "cors";
import express, { Request, Response } from "express";
import pictureRouter from './routes/pictureRoute';
import { createPicturesTable } from "./config/postgreConfig";


const app = express();
const port = process.env.PORT!;
app.use(cors());

app.get("/", (req: Request, res: Response) => res.json("Greetings"));

app.use("/api/pictures", pictureRouter);

(async () => {
  await createPicturesTable();

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
})();
export default app;