import express from "express";
import { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import routes from "./routes/index.js";

dotenv.config();

const server = express();

server.use(express.json());
server.use(cors());

server.get("/status", (req: Request, res: Response): void => {
	res.send("It's alive!!!");
});

server.use(routes);

server.listen(process.env.PORT, (): void =>
	console.log(`Listening on port ${process.env.PORT}...`)
);
