import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "joi";

type Validation = (req: Request, res: Response, next: NextFunction) => void;

function validateBody<T>(schema: ObjectSchema<T>): Validation {
	return (req: Request, res: Response, next: NextFunction) => {
		const { body } = req;

		const { error } = schema.validate(body);

		if (error) {
			return res.status(400).send({
				message: "Dado(s) inválido(s), por favor verifique os campos.",
			});
		}

		next();
	};
}

export { validateBody };
