import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { NewUser, User, UserEntity } from "../protocols/User.js";
import * as authRepository from "../repositories/auth.repositoy.js";

async function signup(req: Request, res: Response) {
	let { username, email, password } = req.body as NewUser;

	const passwordHash: string = bcrypt.hashSync(password, 13);

	password = passwordHash;

	try {
		const user: UserEntity | undefined = await authRepository.findUser(email);

		if (user) {
			return res.status(409).send({ message: "Usuário já existe." });
		}

		const insertedUser: number = await authRepository.insertUser({
			username,
			email,
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

async function signin(req: Request, res: Response) {
	const { email, password } = req.body as User;

	try {
		const user: UserEntity | undefined = await authRepository.findUser(email);

		if (!user || !bcrypt.compareSync(password, user.password.trim())) {
			return res.status(401).send({ message: "Email ou senha inválida." });
		}

		user.username = user.username.trim();
		user.password = user.password.trim();

		const session: boolean = await authRepository.userHasActiveSession(user.id);

		if (session) {
			return res.sendStatus(400);
		}

		const token: string = jwt.sign({ user: user.id }, process.env.JWT_SECRET);

		const insertedSession: number = await authRepository.insertSession(
			user.id,
			token
		);

		if (insertedSession === 0) {
			return res.status(400).send({ message: "Não foi possível entrar." });
		}

		res.status(200).send({ token, username: user.username });
	} catch (error) {
		console.error(error);
		res.sendStatus(500);
	}
}

async function logout(req: Request, res: Response) {
	const token: string = res.locals.token;

	try {
		const deletedSession: number = await authRepository.deleteSession(token);

		if (deletedSession === 0) {
			return res.status(400).send({ message: "Não foi possível sair." });
		}

		res.sendStatus(204);
	} catch (error) {
		console.error(error);
		res.sendStatus(500);
	}
}

export { signup, signin, logout };
