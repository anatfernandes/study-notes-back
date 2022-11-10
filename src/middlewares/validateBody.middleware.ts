import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "joi";

function validateBody<T>(schema: ObjectSchema<T>) {
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
