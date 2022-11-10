import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { Session } from "../protocols/Session.js";
import * as authRepository from "../repositories/auth.repositoy.js";

async function validateSession(
	req: Request,
	res: Response,
	next: NextFunction
) {
	const token: string = req.headers.authorization?.replace("Bearer ", "");

	if (!token) return res.sendStatus(401);

	try {
		jwt.verify(token, process.env.JWT_SECRET);
	} catch (error) {
		console.error(error);
		res.sendStatus(401);
	}

	try {
		const session: Session = await authRepository.hasActiveSession(token);

		if (!session) {
			return res.sendStatus(400);
		}

		res.locals.token = token;
		res.locals.session = session.id;
		res.locals.user = session.user_id;

		next();
	} catch (error) {
		console.error(error);
		res.sendStatus(500);
	}
}

export { validateSession };
