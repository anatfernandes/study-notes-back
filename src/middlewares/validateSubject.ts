import { Request, Response, NextFunction } from "express";
import { SubjectEntity } from "../protocols/Subject.js";
import * as subjectsRepository from "../repositories/subjects.repository.js";

function validateSubject(param: string) {
	return async (req: Request, res: Response, next: NextFunction) => {
		const user: number = Number(res.locals.user);

		let subjectId: number | null;

		if (param === "body") {
			subjectId = Number(req.body.subjectId) || null;
		} else if (param === "params") {
			subjectId = Number(req.params.id) || null;
		}

		if (isNaN(subjectId) || !subjectId || subjectId < 1) {
			return res.sendStatus(400);
		}

		try {
			const hasSubject: SubjectEntity | undefined =
				await subjectsRepository.findSubjectById(subjectId, user);

			if (!hasSubject) {
				return res.status(404).send({ message: "Tópico não encontrado." });
			}

			res.locals.subjectId = subjectId;
			res.locals.subject = hasSubject;

			next();
		} catch (error) {
			console.error(error);
			res.sendStatus(500);
		}
	};
}

export { validateSubject };
