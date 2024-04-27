import "dotenv/config";
import cors from "cors";
import express, { Request, Response } from "express";
import pictureRouter from './routes/pictureRoute';


const app = express();
const port = process.env.PORT!;
app.use(cors());

app.get("/", (req: Request, res: Response) => res.json("Greetings"));

app.use("/api/pictures", pictureRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app;