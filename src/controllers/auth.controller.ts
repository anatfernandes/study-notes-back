import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { User } from "../protocols/User.js";
import * as authRepository from "../repositories/auth.repositoy.js";

async function signup(req: Request, res: Response) {
	let { username, picture, password } = req.body as User;

	if (!username || !picture || !password) return res.sendStatus(400);

	const passwordHash: string = bcrypt.hashSync(password, 13);

	password = passwordHash;

	try {
		const insertedUser: number = await authRepository.insertUser({
			username,
			picture,
			password,
		});

		if (insertedUser === 0) {
			return res
				.status(400)
				.send({ message: "Não foi possível criar usuário." });
		}

		res.sendStatus(201);
	} catch (error) {
		console.error(error);
		res.sendStatus(500);
	}
}

export { signup };
