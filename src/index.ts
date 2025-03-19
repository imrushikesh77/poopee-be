import express, { Request, Response } from "express"
import cors from "cors"
import dotenv from "dotenv"
dotenv.config();

import toiletRouter from "./routes/toilet.route.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/health", (req: Request, res: Response) => {
    res.status(200).send("OK");
});

app.use("/api", toiletRouter)
app.use("*", (req: Request, res: Response) => {
    res.status(404).send("Not Found");
}
);


export default app;