import express from "express";
import { Request, Response } from "express";

const server = express();

server.use(express.json());

server.get("/status", (req: Request, res: Response): void => {
	res.send("It's alive!!!");
});

server.listen(4000, (): void => console.log(`Listening on port 4000...`));
