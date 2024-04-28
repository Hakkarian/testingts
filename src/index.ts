import dotenv from 'dotenv';
dotenv.config();
import cors from "cors";
import express, { Request, Response } from "express";
import pictureRouter from './routes/pictureRoute';
import basicRouter from './routes/basicRoute';
import { createPicturesTable } from "./config/postgreConfig";


const app = express();
const port = process.env.PORT!;
app.use(cors());
app.use("/", basicRouter)
app.use("/api/pictures", pictureRouter);


(async () => {
  await createPicturesTable();
})();

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
export default app;